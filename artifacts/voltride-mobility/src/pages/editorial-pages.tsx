import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, BatteryCharging, BusFront, Check, MapPin, Route, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { EditorialMedia, EditorialSection, MotionReveal, PageIntro } from '@/components/editorial';
import { partnerMedia } from '@/lib/media';
import { supabase } from '@/lib/supabase';

type ManufacturerProfile = {
  name: string;
  route: string;
  logo: string;
  backdrop: string;
  statement: string;
  philosophy: string;
  projectRole: string;
  impact: string;
  productScope: string;
  gallery: string[];
  captions: string[];
};

const manufacturers: ManufacturerProfile[] = [
  {
    name: 'King Long',
    route: '/partners/king-long',
    logo: '/brand-assets/kinglong-logo.png',
    backdrop: partnerMedia.kingLong.backdrop,
    statement: 'A coach is more than a silhouette. It is the passenger space, the working environment and the operating rhythm brought together.',
    philosophy: 'King Long brings a manufacturer’s perspective on vehicle architecture, passenger environments and electric coach design. VoltRide approaches each vehicle as a working asset: its form matters, but so do the route, charging window, passenger profile and support plan around it.',
    projectRole: 'King Long is a confirmed OEM partner in VoltRide’s manufacturer network. Its coach platform gives the project a vehicle reference point for operator conversations, route fit and the coordination of energy and operating requirements.',
    impact: 'The partnership gives operators a direct path into manufacturer-level vehicle discussions while VoltRide connects those discussions to local operating conditions. Model, specification, supply, warranty and support details are selected and confirmed for each project.',
    productScope: 'Electric intercity coach platforms, passenger cabin layouts and coach configurations are represented in the supplied media. Exact model identifiers, capacities, range and technical specifications are not included in the current source material and are intentionally not inferred.',
    gallery: partnerMedia.kingLong.gallery,
    captions: ['Electric coach study', 'Coach exterior reference', 'King Long vehicle reference', 'Vehicle form study', 'Coach body detail', 'Electric coach profile', 'Passenger cabin', 'Passenger cabin detail'],
  },
  {
    name: 'Yutong',
    route: '/partners/yutong',
    logo: '/brand-assets/yutong-logo.png',
    backdrop: partnerMedia.yutong.backdrop,
    statement: 'Good transport design begins with the people who depend on the service, and the conditions the vehicle meets every day.',
    philosophy: 'Yutong’s manufacturer role spans passenger vehicles designed for distinct service patterns. For VoltRide, that perspective supports a practical conversation about coach and bus formats, passenger experience and the demands of each operator’s route.',
    projectRole: 'Yutong is a confirmed OEM partner. VoltRide brings its vehicle conversations into a broader deployment plan, connecting vehicle selection with charging readiness, route duty cycles and operator requirements.',
    impact: 'This relationship expands the range of manufacturer options that can be considered with operators. The specific vehicle, equipment, commercial terms and local support approach are confirmed only after the operating brief is understood.',
    productScope: 'The supplied portfolio imagery includes coach-form vehicles. Coach and bus families can be discussed with the manufacturer, but exact model names, battery configurations and performance figures are not present in the supplied materials.',
    gallery: partnerMedia.yutong.gallery,
    captions: ['Yutong coach on route', 'Yutong coach exterior', 'Coach design reference'],
  },
  {
    name: 'Zhongtong',
    route: '/partners/zhongtong',
    logo: '/brand-assets/zhongtong-logo.png',
    backdrop: partnerMedia.zhongtong.backdrop,
    statement: 'A manufacturer contributes the vehicle platform. A successful deployment also accounts for the route, the depot and the people operating it.',
    philosophy: 'Zhongtong’s coach and bus manufacturing experience provides another vehicle perspective for the VoltRide platform. The work starts by matching a vehicle concept to the service it needs to perform, not by assuming a single configuration fits every route.',
    projectRole: 'Zhongtong is a confirmed OEM partner. VoltRide coordinates operator requirements with manufacturer conversations and the associated energy and operating plan.',
    impact: 'The partnership creates another route into OEM-level evaluation for East African operators. Availability, final configuration, local service arrangements and technical suitability are established with the manufacturer for each opportunity.',
    productScope: 'The supplied media shows coach-form vehicle references. Bus and coach product families may be explored with Zhongtong; the current source assets do not provide model names or technical specifications, so none are represented as confirmed here.',
    gallery: partnerMedia.zhongtong.gallery,
    captions: ['Zhongtong coach reference', 'Coach on the road'],
  },
];

function ManufacturerPage({ profile }: { profile: ManufacturerProfile }) {
  return (
    <main className="partner-page" style={{ '--partner-backdrop': `url("${profile.backdrop}")` } as React.CSSProperties}>
      <PageIntro
        number="01"
        eyebrow="Confirmed OEM partner"
        title={<>{profile.name}<br /><span>Built for the journey.</span></>}
        media={{ src: profile.gallery[0], alt: `${profile.name} electric coach`, caption: `${profile.name} / vehicle reference` }}
        action={<Link className="button outline" href="/contact">Discuss a fleet requirement <ArrowRight aria-hidden="true" /></Link>}
      >
        {profile.statement}
      </PageIntro>

      <section className="partner-brand-strip">
        <div className="wrap partner-brand-row">
          <div className="eyebrow">VoltRide OEM network</div>
          <img src={profile.logo} alt={`${profile.name} logo`} width="140" height="76" decoding="async" />
          <p>Manufacturer relationship confirmed</p>
        </div>
      </section>

      <EditorialSection number="02" eyebrow="Manufacturer perspective" title="Engineering the passenger journey.">
        <div className="editorial-two-column partner-story">
          <MotionReveal>
            <p className="editorial-lead">{profile.philosophy}</p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="editorial-rule-list">
              <div><span>01</span><p>{profile.projectRole}</p></div>
              <div><span>02</span><p>{profile.impact}</p></div>
            </div>
          </MotionReveal>
        </div>
      </EditorialSection>

      <EditorialSection number="03" eyebrow="Coach and bus portfolio" title="The right vehicle starts with the work it must do." className="editorial-section-tint">
        <div className="product-scope-row">
          <div className="product-scope-icon"><BusFront aria-hidden="true" /></div>
          <div>
            <div className="eyebrow">Vehicle families in discussion</div>
            <p>{profile.productScope}</p>
          </div>
        </div>
        <div className="partner-gallery">
          {profile.gallery.map((image, index) => (
            <EditorialMedia
              key={image}
              src={image}
              alt={`${profile.name} ${profile.captions[index] ?? 'vehicle reference'}`}
              caption={profile.captions[index] ?? `${profile.name} vehicle reference`}
              className={`partner-gallery-item gallery-item-${index + 1}`}
              fit={index === 0 && profile.name === 'King Long' ? 'contain' : 'cover'}
            />
          ))}
        </div>
      </EditorialSection>

      {profile.name === 'King Long' ? (
        <section className="editorial-section partner-film-section">
          <div className="wrap film-layout">
            <MotionReveal>
              <div className="eyebrow">Design in motion</div>
              <h2 className="display">See the coach<br />from every angle.</h2>
              <p>Manufacturer-supplied video reference. Playback starts only when selected.</p>
            </MotionReveal>
            <video controls preload="none" poster={partnerMedia.kingLong.gallery[0]} playsInline>
              <source src={partnerMedia.kingLong.video} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </section>
      ) : null}

      <section className="partner-next wrap">
        <div>
          <div className="eyebrow">From vehicle to operation</div>
          <h2 className="display">A considered fleet begins with a real route.</h2>
        </div>
        <Link className="button" href="/contact">Start a conversation <ArrowRight aria-hidden="true" /></Link>
      </section>
    </main>
  );
}

export function KingLongPage() {
  return <ManufacturerPage profile={manufacturers[0]} />;
}

export function YutongPage() {
  return <ManufacturerPage profile={manufacturers[1]} />;
}

export function ZhongtongPage() {
  return <ManufacturerPage profile={manufacturers[2]} />;
}

export function ApproachPage() {
  return (
    <main>
        <PageIntro number="01" eyebrow="Our approach" title={<>A fleet is a system.<br /><span>Start with the route.</span></>} media={{ src: partnerMedia.approachHeroImage, alt: 'VoltRide mobility route and fleet image', caption: 'Vehicle and energy / considered together' }}>
        VoltRide connects coach ownership, charging infrastructure, battery lifecycle and coordinated operations around the realities of intercity service in East Africa.
      </PageIntro>
      <EditorialSection number="02" eyebrow="A practical sequence" title="Decisions in the order they matter.">
        <div className="approach-steps">
          {[
            ['01', 'Understand the service', 'Map routes, schedules, passenger needs, fleet utilization and the operating constraints that shape a viable vehicle choice.'],
            ['02', 'Assess readiness', 'Review depot context, charging windows, site conditions and the questions that need engineering or utility input.'],
            ['03', 'Structure the fleet', 'Explore ownership, leasing and battery lifecycle considerations against the operator’s planning horizon.'],
            ['04', 'Coordinate delivery', 'Bring manufacturer, energy and operating stakeholders together around a project-specific plan.'],
          ].map(([number, title, body]) => (
            <MotionReveal className="approach-step" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{body}</p>
            </MotionReveal>
          ))}
        </div>
      </EditorialSection>
      <EditorialSection eyebrow="The operating principle" title="No brochure answer for a route-specific question." className="editorial-section-dark">
        <div className="editorial-two-column">
          <p className="editorial-lead">Vehicle, energy and operations are planned together, while technical feasibility, terms and responsibilities are confirmed with the relevant partners.</p>
          <EditorialMedia src={partnerMedia.chargingHub} alt="Electric bus charging hub with rooftop solar and battery storage" caption="Energy and fleet infrastructure considered as one operating context" />
        </div>
      </EditorialSection>
      <PartnerCallout />
    </main>
  );
}

export function CoachesPage() {
  return (
    <main>
        <PageIntro number="02" eyebrow="Electric coaches" title={<>Choose for the<br /><span>journey, not the brochure.</span></>} media={{ src: manufacturers[0].gallery[0], alt: 'Electric coach reference from the OEM portfolio', caption: 'Electric coach / illustrative reference' }}>
        VoltRide works with operators to identify where an electric coach can fit, then brings manufacturer conversations into the route, depot and ownership picture.
      </PageIntro>
      <EditorialSection number="03" eyebrow="Vehicle landscape" title="Three manufacturer perspectives. One operator-led brief.">
        <div className="coach-manufacturer-grid">
          {manufacturers.map((manufacturer, index) => (
            <Link className="coach-manufacturer" href={manufacturer.route} key={manufacturer.name}>
              <EditorialMedia src={manufacturer.gallery[0]} alt={`${manufacturer.name} electric coach`} className="coach-manufacturer-photo" fit="contain" />
              <div className="coach-manufacturer-copy">
                <div className="eyebrow">OEM partner / 0{index + 1}</div>
                <h3>{manufacturer.name}</h3>
                <p>{manufacturer.productScope}</p>
                <span className="text-link">Explore manufacturer profile <ArrowUpRight aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </EditorialSection>
      <EditorialSection eyebrow="Selection criteria" title="The vehicle has to earn its place on the route." className="editorial-section-tint">
        <div className="criteria-grid">
          <div><Route aria-hidden="true" /><h3>Duty cycle</h3><p>Distance, terrain, schedule, stops and turnaround time.</p></div>
          <div><BusFront aria-hidden="true" /><h3>Passenger service</h3><p>Seating, luggage, accessibility and the expected passenger experience.</p></div>
          <div><BatteryCharging aria-hidden="true" /><h3>Energy readiness</h3><p>Charging access, depot power, dwell windows and maintenance context.</p></div>
        </div>
      </EditorialSection>
      <PartnerCallout />
    </main>
  );
}

function PartnerCallout() {
  return (
    <section className="partner-next wrap">
      <div><div className="eyebrow">Your operating context</div><h2 className="display">Bring us your route.</h2></div>
      <Link className="button" href="/contact">Request a fleet assessment <ArrowRight aria-hidden="true" /></Link>
    </section>
  );
}

export function VoltriumPage() {
  return (
    <main className="voltrium-page">
      <PageIntro
        number="04"
        eyebrow="Charging infrastructure"
        title={<>Power the route.<br /><span>Plan the whole hub.</span></>}
        media={{ src: '/brand-assets/charging-depot.jpg', alt: 'Electric coach charging depot', caption: 'Charging readiness / site context' }}
        action={<a className="button" href="https://voltrium.lucene.co" target="_blank" rel="noreferrer">Visit Voltrium <ArrowUpRight aria-hidden="true" /></a>}
      >
        Voltrium is VoltRide’s charging-infrastructure partner. Together, the planning starts with the vehicle duty cycle and works outward to the charging site, energy supply and operating plan.
      </PageIntro>

      <section className="partner-brand-strip voltrium-brand-strip">
        <div className="wrap partner-brand-row">
          <div className="eyebrow">Charging infrastructure partner</div>
          <a className="voltrium-brand-link" href="https://voltrium.lucene.co" target="_blank" rel="noreferrer" aria-label="Visit Voltrium website">
            <img src={partnerMedia.voltriumLogo} alt="Voltrium" />
            <span>Official website <ArrowUpRight aria-hidden="true" /></span>
          </a>
        </div>
      </section>

      <section className="wrap voltrium-feature">
        <div className="voltrium-feature-copy">
          <div className="eyebrow">A coordinated energy plan</div>
          <h2 className="display">Two views of the same system.</h2>
          <p>Charging equipment only works in context. The hub image shows a fleet-scale energy environment; the cabinet image shows the charging hardware as part of that larger picture. Site design, equipment selection, grid connection and delivery remain project-specific.</p>
          <a className="text-link" href="https://voltrium.lucene.co" target="_blank" rel="noreferrer">Explore Voltrium’s website <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="charging-composition">
          <EditorialMedia src={partnerMedia.chargingHub} alt="Electric bus charging hub with rooftop solar and energy storage" caption="Fleet charging hub / energy context" className="charging-hub-media" />
          <EditorialMedia src={partnerMedia.chargerCabinet} alt="High-power Kempower charging cabinet and dispenser" caption="Charging cabinet / equipment reference" className="charger-product-media" fit="contain" />
        </div>
      </section>

      <EditorialSection number="05" eyebrow="VoltRide × Voltrium" title="A delivery plan with the operator at its centre." className="editorial-section-dark">
        <div className="deployment-stages">
          {[
            ['01', 'Route and energy brief', 'Understand vehicle duty, daily distance, dwell time, fleet size and service schedule.'],
            ['02', 'Site and power assessment', 'Review land, access, grid context, charging layout and approvals with the appropriate specialists.'],
            ['03', 'Phased infrastructure plan', 'Develop a staged charging approach aligned to fleet introduction and operating needs.'],
          ].map(([number, title, body]) => (
            <MotionReveal className="deployment-stage" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{body}</p>
            </MotionReveal>
          ))}
        </div>
        <p className="editorial-disclaimer">This is a planning framework, not a confirmed site design or delivery commitment. Capacity, equipment, approvals, cost and schedule depend on assessment and agreement.</p>
      </EditorialSection>
      <PartnerCallout />
    </main>
  );
}

export function VoltCyclePage() {
  return (
    <main className="voltcycle-page" style={{ '--partner-backdrop': `url("${partnerMedia.voltcycleBackdrop}")` } as React.CSSProperties}>
        <PageIntro number="05" eyebrow="Battery leasing and lifecycle" title={<>Plan beyond the<br /><span>first charge.</span></>} media={{ src: partnerMedia.voltcycleHeroImage, alt: 'Electric vehicle battery modules and high-voltage wiring', caption: 'Battery lifecycle / system reference' }}>
        VoltCycle is the platform’s battery leasing and lifecycle-management capability, connecting battery decisions to how a fleet is financed, operated and maintained over time.
      </PageIntro>
      <section className="wrap battery-feature">
        <EditorialMedia src={partnerMedia.batteryPack} alt="Electric coach battery pack and module assembly" caption="Battery pack reference / configuration varies by vehicle" className="battery-feature-image" />
        <MotionReveal className="battery-feature-copy">
          <div className="eyebrow">VoltCycle / Battery lifecycle management</div>
          <h2 className="display">The battery is an operating decision.</h2>
          <p>Battery leasing can be considered alongside coach ownership and the operator’s cash-flow and service needs. The appropriate structure depends on the vehicle, commercial terms and lifecycle responsibilities agreed for the project.</p>
          <Link className="button outline" href="/contact">Discuss a battery pathway <ArrowRight aria-hidden="true" /></Link>
        </MotionReveal>
      </section>
      <EditorialSection number="06" eyebrow="Lifecycle view" title="One asset. A longer operating story." className="editorial-section-tint">
        <div className="lifecycle-timeline">
          {[
            ['Vehicle integration', 'Confirm pack, vehicle and charging interfaces with the relevant manufacturer and technical teams.'],
            ['In-use management', 'Plan operating data, maintenance responsibilities and battery performance monitoring.'],
            ['End-of-term pathway', 'Define ownership, return, reuse or end-of-life arrangements in the project agreement.'],
          ].map(([title, body], index) => (
            <MotionReveal className="lifecycle-milestone" key={title} delay={index * 0.06}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
            </MotionReveal>
          ))}
        </div>
        <p className="editorial-disclaimer">Leasing availability, ownership, residual value, warranties and end-of-life processes are not assumed. Each item requires verification and contractual definition.</p>
      </EditorialSection>
      <PartnerCallout />
    </main>
  );
}

export function EcosystemPage() {
  const [activeNodeId, setActiveNodeId] = useState('voltride');
  const networkNodes = [
    { id: 'voltride', className: 'node-voltride', name: 'VoltRide Mobility', role: 'Platform coordinator', logo: '/brand-assets/voltride-logo.png', detail: 'VoltRide owns or leases coaches and coordinates vehicle, energy and operating capabilities around the operator’s route.', href: '/approach', linkLabel: 'Our approach' },
    { id: 'king-long', className: 'node-king-long', name: 'King Long', role: 'OEM partner', logo: '/brand-assets/kinglong-logo.png', detail: 'Confirmed OEM partner providing a coach-platform reference for route fit, passenger requirements and project-specific vehicle discussions.', href: '/partners/king-long', linkLabel: 'King Long profile' },
    { id: 'yutong', className: 'node-yutong', name: 'Yutong', role: 'OEM partner', logo: '/brand-assets/yutong-logo.png', detail: 'Confirmed OEM partner bringing another manufacturer perspective to vehicle configuration and operator requirements.', href: '/partners/yutong', linkLabel: 'Yutong profile' },
    { id: 'zhongtong', className: 'node-zhongtong', name: 'Zhongtong', role: 'OEM partner', logo: '/brand-assets/zhongtong-logo.png', detail: 'Confirmed OEM partner contributing coach and bus manufacturing perspective to route-specific fleet planning.', href: '/partners/zhongtong', linkLabel: 'Zhongtong profile' },
    { id: 'voltrium', className: 'node-voltrium', name: 'Voltrium', role: 'Charging infrastructure', logo: partnerMedia.voltriumLogo, detail: 'Charging infrastructure planning connects vehicle duty cycles with site, equipment and energy readiness.', href: '/voltrium', linkLabel: 'Charging infrastructure' },
    { id: 'voltcycle', className: 'node-voltcycle', name: 'VoltCycle', role: 'Battery lifecycle', logo: '/brand-assets/voltcycle-logo.png', detail: 'Battery leasing and lifecycle considerations are planned across the fleet operating horizon.', href: '/voltcycle', linkLabel: 'Battery lifecycle' },
    { id: 'autovance', className: 'node-autovance', name: 'Autovance', role: 'Coordinated operations', logo: partnerMedia.autovanceLogo, detail: 'Coordinates platform operations and the customer journey across the mobility platform.', href: '/contact', linkLabel: 'Discuss coordination' },
    { id: 'terranova', className: 'node-terranova', name: 'TerraNova', role: 'Portfolio oversight', logo: '/brand-assets/terranova-logo.png', detail: 'Portfolio-level oversight is distinct from day-to-day delivery responsibilities.', href: '', linkLabel: '' },
  ];
  const selectedNode = networkNodes.find((node) => node.id === activeNodeId) ?? networkNodes[0];
  const networkEdges = [
    'M500 330 C410 245 285 174 180 105',
    'M500 330 C500 245 500 175 500 105',
    'M500 330 C590 245 715 174 820 105',
    'M500 330 C390 330 285 330 180 330',
    'M500 330 C610 330 715 330 820 330',
    'M500 330 C465 425 405 500 350 560',
    'M500 330 C535 425 595 500 650 560',
  ];

  return (
    <main>
      <PageIntro number="06" eyebrow="The coordinated system" title={<>The coach is visible.<br /><span>The system makes it work.</span></>} media={{ src: partnerMedia.ecosystemHeroImage, alt: 'Electric coach representing the VoltRide partner ecosystem', caption: 'A connected mobility platform / relationship map' }}>
        VoltRide brings distinct partner capabilities into a shared plan, with the operator’s route and service requirements as the organising brief.
      </PageIntro>
      <section className="wrap ecosystem-network-section" aria-label="VoltRide partner relationship network">
        <div className="eyebrow">Select a node to explore its relationship</div>
        <div className="ecosystem-network" style={{ '--ecosystem-watermark': `url("${partnerMedia.voltrideTransparentMark}")` } as React.CSSProperties}>
          <svg className="ecosystem-network-edges" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
            {networkEdges.map((edge) => <path d={edge} key={edge} />)}
          </svg>
          <div className="ecosystem-network-nodes">
            {networkNodes.map((node) => (
              <button
                className={`ecosystem-network-node ${node.className}${activeNodeId === node.id ? ' is-active' : ''}`}
                type="button"
                key={node.id}
                aria-pressed={activeNodeId === node.id}
                onClick={() => setActiveNodeId(node.id)}
              >
                {node.logo ? <img src={node.logo} alt="" aria-hidden="true" /> : <span className="ecosystem-node-wordmark">{node.name}</span>}
                <span className="ecosystem-node-name">{node.name}</span>
                <span className="ecosystem-node-role">{node.role}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="ecosystem-selected" aria-live="polite">
          {selectedNode.logo ? <img src={selectedNode.logo} alt="" aria-hidden="true" /> : <span className="ecosystem-selected-mark">{selectedNode.name.slice(0, 2).toUpperCase()}</span>}
          <div>
            <div className="eyebrow">{selectedNode.role}</div>
            <h2 className="display">{selectedNode.name}</h2>
            <p>{selectedNode.detail}</p>
            {selectedNode.href ? <Link className="text-link" href={selectedNode.href}>{selectedNode.linkLabel} <ArrowRight aria-hidden="true" /></Link> : null}
          </div>
        </div>
      </section>
      <section className="wrap ecosystem-separate">
        <div className="ecosystem-separate-rule" aria-hidden="true" />
        <div className="ecosystem-separate-brand"><img src={partnerMedia.terraBelleLogo} alt="Terra Belle Foundation" /><div><div className="eyebrow">Green funding & initiatives partner</div><h2 className="display">Terra Belle Foundation</h2><p>Terra Belle partners with VoltRide on green funding and responds to green-energy initiatives that support the shift to clean mobility.</p></div></div>
        <div className="ecosystem-separate-links">
          <Link className="text-link" href="/terra-belle">About Terra Belle <ArrowRight aria-hidden="true" /></Link>
          <a className="ecosystem-terrabelle-logo" href="https://terrabelle.lucene.co" target="_blank" rel="noreferrer" aria-label="Visit Terra Belle Foundation website"><img src={partnerMedia.terraBelleLogo} alt="Terra Belle Foundation" /></a>
        </div>
      </section>
      <section className="wrap foundation-note">
        <div className="eyebrow">Funding the clean-energy transition</div>
        <h2 className="display">Green finance. Cleaner journeys.</h2>
        <p>Terra Belle Foundation brings green-funding and initiative-response capacity to VoltRide’s clean mobility work. Funding scope, eligibility and delivery responsibilities are assessed for each opportunity.</p>
        <Link className="text-link" href="/terra-belle">About Terra Belle Foundation <ArrowRight aria-hidden="true" /></Link>
      </section>
    </main>
  );
}

export function TerraBellePage() {
  return (
    <main className="foundation-page">
      <PageIntro number="07" eyebrow="Green funding & initiatives partner" title={<>Terra Belle<br /><span>Foundation.</span></>} media={{ src: '/brand-assets/terranova-landscape.jpg', alt: 'Illustrative layered landscape in green and stone tones', caption: 'Green funding / clean-energy initiatives' }}>
        Terra Belle Foundation partners with VoltRide on green funding and responds to green-energy initiatives, helping connect sustainable finance with the transition to cleaner mobility.
      </PageIntro>
      <EditorialSection number="08" eyebrow="Shared clean-energy purpose" title="Funding the transition together.">
        <div className="foundation-editorial">
          <a className="foundation-logo-link" href="https://terrabelle.lucene.co" target="_blank" rel="noreferrer" aria-label="Visit Terra Belle Foundation website">
            <img src={partnerMedia.terraBelleLogo} alt="Terra Belle Foundation" />
            <span>Visit official website <ArrowUpRight aria-hidden="true" /></span>
          </a>
          <div>
            <p className="editorial-lead">Terra Belle brings a green-funding perspective to VoltRide’s work and responds to initiatives that advance clean energy and low-emission transport.</p>
            <p>The Foundation’s role is to help identify and respond to relevant green-energy initiatives and funding opportunities. Programme scope, eligibility, funding availability and delivery responsibilities are established for each opportunity, with operational delivery coordinated by the appropriate teams.</p>
          </div>
        </div>
      </EditorialSection>
      <section className="foundation-contact wrap">
        <div className="eyebrow">Green energy initiatives</div>
        <h2 className="display">Bring a funding opportunity forward.</h2>
        <p>Explore Terra Belle’s work and current initiatives with the Foundation.</p>
        <a className="button" href="https://terrabelle.lucene.co" target="_blank" rel="noreferrer">Visit Terra Belle <ArrowUpRight aria-hidden="true" /></a>
      </section>
    </main>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const honeypot = String(form.get('website') ?? '').trim();
    if (honeypot) {
      setSubmitted(true);
      setSubmitMessage('Your enquiry has been received.');
      return;
    }

    const attachment = form.get('attachment');
    const payload = {
      name: String(form.get('name') ?? '').trim(),
      organisation: String(form.get('organisation') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      interest: String(form.get('interest') ?? '').trim(),
      context: String(form.get('context') ?? '').trim(),
      source: 'voltride-website',
    };

    if (!payload.name || !payload.organisation || !payload.email || !payload.interest) {
      setSubmitted(false);
      setSubmitMessage('Please complete all required fields before submitting.');
      return;
    }

    try {
      let attachmentPath: string | null = null;
      if (attachment instanceof File && attachment.size > 0) {
        const allowedTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!allowedTypes.includes(attachment.type) || attachment.size > 10 * 1024 * 1024) {
          throw new Error('Attach a PDF or DOCX file smaller than 10 MB.');
        }
        const safeName = attachment.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        attachmentPath = `incoming/${crypto.randomUUID()}/${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from('contact-inquiry-files')
          .upload(attachmentPath, attachment, { contentType: attachment.type, upsert: false });
        if (uploadError) throw uploadError;
      }

      const inquiryPayload = { ...payload, attachment_path: attachmentPath };
      const { error } = await supabase.from('contact_inquiries').insert([inquiryPayload]);

      if (error) {
        if (attachmentPath) {
          await supabase.storage.from('contact-inquiry-files').remove([attachmentPath]);
        }
        throw error;
      }

      setSubmitted(true);
      setSubmitMessage('Your enquiry has been stored successfully. Your email app should open with the details ready to send.');

      const subject = encodeURIComponent(`VoltRide enquiry: ${payload.interest}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nOrganisation: ${payload.organisation}\nEmail: ${payload.email}\nInterest: ${payload.interest}\n\n${payload.context}`,
      );

      window.location.href = `mailto:hello@lucene.co?subject=${subject}&body=${body}`;
    } catch (error) {
      setSubmitted(false);
      setSubmitMessage(
        error instanceof Error
          ? `We could not save the enquiry yet: ${error.message}`
          : 'We could not save the enquiry yet. Please email hello@lucene.co directly.',
      );
    }
  }

  return (
    <main className="contact-page">
      <PageIntro number="08" eyebrow="Contact VoltRide" title={<>Bring us your route.<br /><span>We’ll start there.</span></>} media={{ src: '/brand-assets/fleet-operations_1792051092148.jpg', alt: 'Fleet operations team coordinating a transport service', caption: 'Start with the operating context' }}>
        Fleet assessments, OEM discussions and infrastructure enquiries start with a conversation about the service you operate and the change you are considering.
      </PageIntro>
      <section className="wrap contact-page-grid">
        <div className="contact-details">
          <EditorialMedia src={partnerMedia.chargingHub} alt="Electric buses at a solar-powered charging hub" caption="A connected fleet begins with the right operating context" className="contact-editorial-image" />
          <MotionReveal className="contact-details-copy">
            <div className="eyebrow">Talk to the team</div>
            <h2 className="display">VoltRide Mobility</h2>
            <a className="contact-email" href="mailto:hello@lucene.co">hello@lucene.co <ArrowUpRight aria-hidden="true" /></a>
            <div className="contact-phone-list">
              <a href="tel:+254202345678">+254202-345-678</a>
              <a href="tel:+254727750097">+254727750097</a>
              <a href="tel:+254722863550">+2547-228-635-50</a>
            </div>
            <p><MapPin aria-hidden="true" /> East Africa / Intercity mobility</p>
          </MotionReveal>
        </div>
        <form className="lead-form contact-page-form" onSubmit={handleSubmit}>
          <div className="eyebrow form-heading">Start a conversation</div>
          <div className="contact-trap" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="contact-organisation">Organisation</label><input id="contact-organisation" name="organisation" autoComplete="organization" required /></div>
          <div className="field"><label htmlFor="contact-email">Work email</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="contact-interest">Area of interest</label><select id="contact-interest" name="interest" defaultValue="" required><option value="" disabled>Select an area</option><option>Fleet assessment</option><option>Coach ownership or leasing</option><option>Charging infrastructure</option><option>Battery leasing and lifecycle</option><option>OEM or partnership discussion</option></select></div>
          <div className="field full"><label htmlFor="contact-context">Your route or question</label><textarea id="contact-context" name="context" placeholder="Share the route, fleet context or question you are working through." /></div>
          <div className="field full"><label htmlFor="contact-attachment">Supporting document <span>(PDF or DOCX, max 10 MB)</span></label><input id="contact-attachment" name="attachment" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></div>
          <div className="form-bottom"><button className="button" type="submit" disabled={submitted}>{submitted ? 'Saved and ready' : 'Prepare enquiry'} <ArrowRight aria-hidden="true" /></button><p className="form-note">The enquiry is saved to Supabase and an email draft opens for the sender.</p></div>
          <div className="form-status" role="status" aria-live="polite">{submitMessage ? (submitted ? <><Check size={15} aria-hidden="true" /> {submitMessage}</> : submitMessage) : null}</div>
        </form>
      </section>
    </main>
  );
}