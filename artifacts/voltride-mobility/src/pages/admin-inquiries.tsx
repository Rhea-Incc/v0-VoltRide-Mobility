import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Download, LogOut, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type InquiryStatus = 'new' | 'contacted' | 'qualified' | 'closed';

type Inquiry = {
  id: string;
  created_at: string;
  name: string;
  organisation: string;
  email: string;
  interest: string;
  context: string | null;
  source: string;
  status: InquiryStatus;
  attachment_path: string | null;
};

const statusOptions: InquiryStatus[] = ['new', 'contacted', 'qualified', 'closed'];

export default function AdminInquiriesPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setMessage(error.message);
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthorized(false);
      setInquiries([]);
      setMessage('');
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setAuthorized(false);
      return;
    }

    let active = true;
    setCheckingAccess(true);
    supabase.rpc('is_contact_inquiry_staff').then(({ data, error }) => {
      if (!active) return;
      setAuthorized(!error && data === true);
      setCheckingAccess(false);
      if (error) setMessage(error.message);
      else if (data !== true) setMessage('This account is signed in but is not assigned to the inquiry desk.');
    });
    return () => { active = false; };
  }, [session]);

  useEffect(() => {
    if (!session || !authorized) return;
    let active = true;

    async function loadInquiries() {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('id, created_at, name, organisation, email, interest, context, source, status, attachment_path')
        .order('created_at', { ascending: false });
      if (!active) return;
      if (error) setMessage(error.message);
      else setInquiries((data ?? []) as Inquiry[]);
      setLoading(false);
    }

    void loadInquiries();
    const channel = supabase
      .channel('contact-inquiries-desk')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_inquiries' }, () => {
        void loadInquiries();
      })
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [session, authorized]);

  const visibleInquiries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return inquiries.filter((inquiry) => {
      const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
      const searchable = `${inquiry.name} ${inquiry.organisation} ${inquiry.email} ${inquiry.interest}`.toLowerCase();
      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [inquiries, query, statusFilter]);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
  }

  async function updateStatus(id: string, status: InquiryStatus) {
    setBusyId(id);
    const { error } = await supabase.from('contact_inquiries').update({ status }).eq('id', id);
    if (error) setMessage(error.message);
    else setInquiries((current) => current.map((inquiry) => inquiry.id === id ? { ...inquiry, status } : inquiry));
    setBusyId('');
  }

  async function openAttachment(path: string) {
    const { data, error } = await supabase.storage.from('contact-inquiry-files').createSignedUrl(path, 60);
    if (error) setMessage(error.message);
    else window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  }

  const metrics = [
    { label: 'Total enquiries', value: inquiries.length },
    { label: 'New', value: inquiries.filter((item) => item.status === 'new').length },
    { label: 'Qualified', value: inquiries.filter((item) => item.status === 'qualified').length },
    { label: 'Closed', value: inquiries.filter((item) => item.status === 'closed').length },
  ];

  if (authLoading || (session && checkingAccess)) {
    return <main className="inquiry-desk wrap"><p className="inquiry-message">Checking secure access…</p></main>;
  }

  if (!session) {
    return (
      <main className="inquiry-login">
        <div className="eyebrow">VoltRide / Operations</div>
        <h1>Inquiry desk</h1>
        <p>Sign in with an account assigned to the VoltRide inquiry team.</p>
        <form onSubmit={handleSignIn}>
          <label>Email<input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="button" type="submit">Sign in</button>
        </form>
        {message ? <p role="status">{message}</p> : null}
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="inquiry-desk wrap">
        <div className="eyebrow">Access restricted</div>
        <h1 className="display">Inquiry desk</h1>
        <p className="inquiry-message" role="status">{message || 'This account is not assigned to the inquiry desk.'}</p>
        <button className="button outline" type="button" onClick={() => void supabase.auth.signOut()}><LogOut size={16} /> Sign out</button>
      </main>
    );
  }

  return (
    <main className="inquiry-desk wrap">
      <header className="inquiry-head">
        <div><div className="eyebrow">VoltRide / Operations</div><h1>Inquiry desk</h1></div>
        <div className="inquiry-controls">
          <input aria-label="Search enquiries" type="search" placeholder="Search enquiries" value={query} onChange={(event) => setQuery(event.target.value)} />
          <select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All statuses</option>
            {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <button className="button outline" type="button" title="Refresh enquiries" onClick={() => window.location.reload()}><RefreshCw size={16} aria-hidden="true" /><span>Refresh</span></button>
          <button className="button outline" type="button" title="Sign out" onClick={() => void supabase.auth.signOut()}><LogOut size={16} aria-hidden="true" /><span>Sign out</span></button>
        </div>
      </header>
      <div className="inquiry-metrics" aria-label="Inquiry summary">
        {metrics.map((metric) => <div className="inquiry-metric" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}
      </div>
      {message ? <p className="inquiry-message" role="status">{message}</p> : null}
      <div className="inquiry-table-wrap">
        <table className="inquiry-table">
          <thead><tr><th>Enquiry</th><th>Interest</th><th>Received</th><th>Status</th><th>Files</th></tr></thead>
          <tbody>
            {visibleInquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td><strong>{inquiry.name}</strong><span>{inquiry.organisation}</span><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>{inquiry.context ? <span>{inquiry.context}</span> : null}</td>
                <td>{inquiry.interest}<span>{inquiry.source}</span></td>
                <td>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(inquiry.created_at))}</td>
                <td><select aria-label={`Status for ${inquiry.name}`} value={inquiry.status} disabled={busyId === inquiry.id} onChange={(event) => void updateStatus(inquiry.id, event.target.value as InquiryStatus)}>{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
                <td>{inquiry.attachment_path ? <button className="button outline" type="button" title="Download attachment" onClick={() => void openAttachment(inquiry.attachment_path!)}><Download size={16} aria-label="Download attachment" /></button> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && visibleInquiries.length === 0 ? <p className="inquiry-empty">No enquiries match this view.</p> : null}
        {loading ? <p className="inquiry-empty">Loading enquiries…</p> : null}
      </div>
    </main>
  );
}
