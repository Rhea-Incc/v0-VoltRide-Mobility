create extension if not exists "pgcrypto";

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  organisation text not null,
  email text not null,
  interest text not null,
  context text,
  source text not null default 'voltride-website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  attachment_path text
);

alter table public.contact_inquiries
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists status text not null default 'new',
  add column if not exists attachment_path text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'contact_inquiries_status_check') then
    alter table public.contact_inquiries
      add constraint contact_inquiries_status_check check (status in ('new', 'contacted', 'qualified', 'closed'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_inquiries_name_length_check') then
    alter table public.contact_inquiries add constraint contact_inquiries_name_length_check check (char_length(trim(name)) between 1 and 120);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_inquiries_organisation_length_check') then
    alter table public.contact_inquiries add constraint contact_inquiries_organisation_length_check check (char_length(trim(organisation)) between 1 and 160);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_inquiries_email_length_check') then
    alter table public.contact_inquiries add constraint contact_inquiries_email_length_check check (char_length(trim(email)) between 3 and 254);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_inquiries_interest_length_check') then
    alter table public.contact_inquiries add constraint contact_inquiries_interest_length_check check (char_length(trim(interest)) between 1 and 120);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_inquiries_context_length_check') then
    alter table public.contact_inquiries add constraint contact_inquiries_context_length_check check (context is null or char_length(context) <= 2000);
  end if;
end;
$$;

alter table public.contact_inquiries enable row level security;

create table if not exists public.contact_inquiry_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiry_staff enable row level security;

create or replace function public.is_contact_inquiry_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.contact_inquiry_staff
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_contact_inquiry_staff() from public;
grant execute on function public.is_contact_inquiry_staff() to authenticated;

drop policy if exists "Allow public inserts to contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated reads to contact_inquiries" on public.contact_inquiries;
drop policy if exists "Staff can read contact inquiries" on public.contact_inquiries;
drop policy if exists "Staff can update contact inquiries" on public.contact_inquiries;

create policy "Allow public inserts to contact_inquiries"
on public.contact_inquiries
for insert
to anon, authenticated
with check (
  status = 'new'
  and source in ('voltride-website', 'voltride-homepage')
  and (attachment_path is null or attachment_path ~ '^incoming/[0-9a-fA-F-]{36}/[^/]+$')
);

create policy "Staff can read contact inquiries"
on public.contact_inquiries
for select
to authenticated
using ((select public.is_contact_inquiry_staff()));

create policy "Staff can update contact inquiries"
on public.contact_inquiries
for update
to authenticated
using ((select public.is_contact_inquiry_staff()))
with check ((select public.is_contact_inquiry_staff()));

revoke insert, update on public.contact_inquiries from anon, authenticated;
grant insert (name, organisation, email, interest, context, source, attachment_path)
  on public.contact_inquiries to anon, authenticated;
grant select on public.contact_inquiries to authenticated;
grant update (status) on public.contact_inquiries to authenticated;

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);
create index if not exists contact_inquiries_status_idx
  on public.contact_inquiries (status);

create or replace function public.set_contact_inquiry_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_contact_inquiry_updated_at on public.contact_inquiries;
create trigger set_contact_inquiry_updated_at
before update on public.contact_inquiries
for each row execute function public.set_contact_inquiry_updated_at();

create or replace function public.limit_contact_inquiry_submissions()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent_submissions integer;
begin
  perform pg_advisory_xact_lock(hashtextextended(lower(trim(new.email)), 0));

  select count(*)
  into recent_submissions
  from public.contact_inquiries
  where lower(email) = lower(trim(new.email))
    and created_at >= now() - interval '15 minutes';

  if recent_submissions >= 3 then
    raise exception 'Too many enquiries from this email address. Please try again later.';
  end if;

  return new;
end;
$$;

drop trigger if exists limit_contact_inquiry_submissions on public.contact_inquiries;
create trigger limit_contact_inquiry_submissions
before insert on public.contact_inquiries
for each row execute function public.limit_contact_inquiry_submissions();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'contact-inquiry-files',
  'contact-inquiry-files',
  false,
  10485760,
  array['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can upload contact inquiry files" on storage.objects;
drop policy if exists "Staff can read contact inquiry files" on storage.objects;

create policy "Public can upload contact inquiry files"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'contact-inquiry-files'
  and name ~ '^incoming/[0-9a-fA-F-]{36}/[^/]+$'
);

create policy "Staff can read contact inquiry files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'contact-inquiry-files'
  and (select public.is_contact_inquiry_staff())
);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'contact_inquiries'
  ) then
    alter publication supabase_realtime add table public.contact_inquiries;
  end if;
end;
$$;
