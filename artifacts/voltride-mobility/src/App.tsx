import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowRight, BatteryCharging, Menu, X, Zap, Activity, ShieldCheck, Route as RouteIcon } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const capabilityDetails = {
  volt: {
    title: 'Voltrium / Charging infrastructure',
    description: 'A distinct charging capability. Site scope, delivery arrangements and feasibility require assessment and confirmation.',
    image: '/brand-assets/charger-closeup.jpg',
    imageAlt: 'Illustrative high-power charging equipment',
    artLabel: 'SITE + CHARGER',
  },
  cycle: {
    title: 'VoltCycle / Battery lifecycle',
    description: 'Battery leasing and lifecycle-management capability. Specific offers, ownership and end-of-life pathways require verification.',
    image: '/brand-assets/battery-pack.jpg',
    imageAlt: 'Illustrative electric coach battery pack',
    artLabel: 'BATTERY LIFECYCLE',
  },
  auto: {
    title: 'Autovance / Coordinated operations',
    description: 'Coordinates platform operations and the customer journey across the mobility platform.',
    image: '/brand-assets/fleet-operations_1792051092148.jpg',
    imageAlt: 'Illustrative fleet operations team at work',
    artLabel: 'ROUTE + OPERATIONS',
  },
  sure: {
    title: 'FleetSure / Role to be verified',
    description: 'Potential ecosystem role, service and coverage are subject to verification. No insurance coverage or service is implied.',
    image: '',
    imageAlt: '',
    artLabel: 'SCOPE SUBJECT TO CONFIRMATION',
  },
} as const;

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [activeNode, setActiveNode] = useState<keyof typeof capabilityDetails>('volt');
  const activeCapability = capabilityDetails[activeNode];

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) return;

    const revealTargets = document.querySelectorAll<HTMLElement>('.site [data-reveal]');
    if (!revealTargets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus('Your details have not been sent. VoltRide’s enquiry service is not connected yet.');
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site">
      <header className="wrap topbar">
        <a className="brand" href="#top" aria-label="VoltRide Mobility home" onClick={closeMenu}>
          <img src="/brand-assets/voltride-logo.png" alt="VoltRide Mobility" />
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu-toggle">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          <a href="#approach" onClick={closeMenu}>Our approach</a>
          <a href="#coaches" onClick={closeMenu}>Coaches</a>
          <a href="#infrastructure" onClick={closeMenu}>Infrastructure</a>
          <a href="#ecosystem" onClick={closeMenu}>Ecosystem</a>
          <a className="button" href="#assessment" onClick={closeMenu}>Request a fleet assessment <ArrowRight aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="top">
        <section className="wrap hero" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow">Intercity mobility, considered end to end</div>
            <h1 className="display" id="hero-title">Electric mobility.<br /><span>Connected</span><br />by design.</h1>
            <p>VoltRide is building an integrated electric coach and mobility platform for East African operators — connecting vehicles, energy and the realities of running a route.</p>
            <div className="hero-actions">
              <a className="button" href="#assessment">Request a fleet assessment <ArrowRight aria-hidden="true" /></a>
              <a className="button outline" href="#coaches">Explore the approach <ArrowDown aria-hidden="true" /></a>
            </div>
            <div className="hero-meta">Built around the operator’s route</div>
          </div>
            <div className="hero-visual">
            <div className="hero-image">
                <img src="/brand-assets/e-coach-hero.jpg" alt="Illustrative electric coach in a dramatic studio setting" />
            </div>
              <div className="hero-mark"><BatteryCharging aria-hidden="true" /><span>VEHICLE<br />+ ENERGY<br />+ OPERATIONS</span></div>
              <div className="hero-coordinate">01°17' S&nbsp; / &nbsp;36°49' E <i /></div>
            <div className="hero-ring" aria-hidden="true" />
            <div className="image-note">Illustrative coach imagery · model and rights subject to verification</div>
          </div>
        </section>

        <div className="ticker" aria-label="Integrated mobility areas">
          <div className="wrap ticker-track">
            <span>Coach ownership</span><span>Route-led assessment</span><span>Charging readiness</span><span>Battery lifecycle</span><span>Coordinated operations</span>
          </div>
        </div>

        <section className="section coach-section" id="coaches">
          <div className="wrap">
            <div className="section-head">
              <div><div className="eyebrow">01 / The vehicle</div><h2 className="display">Start with the route.<br />Then shape the fleet.</h2></div>
              <p>Electric coach fit is not a brochure decision. It begins with duty cycles, passenger expectations, depot conditions and the operating model behind each route.</p>
            </div>
            <div className="coach-layout" data-reveal>
              <div className="coach-photo">
                <img src="/brand-assets/electric-coach.jpg" alt="Illustrative electric coach at a depot" loading="lazy" />
                <div className="photo-index">01 — ELECTRIC COACH REFERENCE</div>
              </div>
              <div className="coach-details">
                <div className="eyebrow">Coach exploration</div>
                <h3 className="display">A coach is one part of a connected operating system.</h3>
                <p>VoltRide owns or leases coaches, then works with operators to understand where an electric intercity vehicle may fit. Candidate configurations, specifications and operating suitability require route-specific assessment.</p>
                <div className="coach-attributes">
                  <div className="attribute"><span>Passenger experience</span><span>Interior, comfort, accessibility</span></div>
                  <div className="attribute"><span>Operating context</span><span>Route, terrain, schedule</span></div>
                  <div className="attribute"><span>Readiness checks</span><span>Depot, charging, service</span></div>
                </div>
                <p className="small-note">Images are illustrative only. Model details, image permissions, availability, warranty and service arrangements are subject to verification.</p>
                <a href="#oem" className="button outline">View illustrative OEM references <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section ownership" id="approach">
          <div className="wrap">
            <div className="section-head">
              <div><div className="eyebrow">02 / Commercial pathways</div><h2 className="display">One fleet need.<br />More than one way to structure it.</h2></div>
              <p>Some operators want to own their assets. Others want to preserve capital or separate vehicle and battery exposure. We start with the operating requirement, not a pre-set answer.</p>
            </div>
            <div className="finance-grid">
              <article className="finance-card" data-reveal>
                <div className="count">PATH 01 / OUTRIGHT</div>
                <h3>Purchase the coach</h3>
                <p>For operators exploring direct ownership, the assessment can map vehicle requirements, charging implications and the service questions to resolve before a purchase decision.</p>
                <div className="finance-tag">Asset ownership by operator</div>
              </article>
              <article className="finance-card" data-reveal>
                <div className="count">PATH 02 / LEASE</div>
                <h3>Lease through VoltRide</h3>
                <p>VoltRide is the coach owner / lessor. A lease structure may help align access to the vehicle with the operator’s planning horizon; commercial terms are discussed case by case.</p>
                <div className="finance-tag">Vehicle ownership by VoltRide</div>
              </article>
            </div>
            <p className="small-note" style={{color:'#b9c7c0',marginTop:18}}>No pricing, financing, availability or lease terms are represented here. Any commercial proposal is subject to assessment and agreement.</p>
          </div>
        </section>

        <section className="section system-section" id="ecosystem">
          <div className="wrap">
            <div className="section-head">
              <div><div className="eyebrow">03 / Coordinated by design</div><h2 className="display">The coach is visible.<br />The system makes it work.</h2></div>
              <p>Different capabilities have distinct roles. The platform is designed to coordinate a customer journey across assets, infrastructure and operating support.</p>
            </div>
            <div className="system-canvas" aria-label="VoltRide mobility ecosystem. Select a capability to explore its role.">
              <div className="system-bg" aria-hidden="true" /><div className="orbit" aria-hidden="true" />
              <div className="pulse pulse-one" aria-hidden="true" /><div className="pulse pulse-two" aria-hidden="true" />
              <div className="system-center"><span className="center-pulse" /><b>VOLTRIDE</b><span>COACH OWNER / LESSOR</span></div>
              <button type="button" data-testid="button-capability-voltrium" aria-pressed={activeNode === 'volt'} onClick={() => setActiveNode('volt')} className={`system-node node-volt ${activeNode === 'volt' ? 'selected' : ''}`}><span className="node-art art-charge"><Zap size={18} /></span><b>VOLTRIUM</b><span>Charging infrastructure represented as a distinct capability; scope and delivery arrangements require confirmation.</span></button>
              <button type="button" data-testid="button-capability-voltcycle" aria-pressed={activeNode === 'cycle'} onClick={() => setActiveNode('cycle')} className={`system-node node-cycle ${activeNode === 'cycle' ? 'selected' : ''}`}><span className="node-art art-cycle"><Activity size={18} /></span><b>VOLTCYCLE</b><span>Battery leasing and lifecycle services represented as a separate capability; specific offers require confirmation.</span></button>
              <button type="button" data-testid="button-capability-autovance" aria-pressed={activeNode === 'auto'} onClick={() => setActiveNode('auto')} className={`system-node node-auto ${activeNode === 'auto' ? 'selected' : ''}`}><span className="node-art art-auto"><RouteIcon size={18} /></span><b>AUTOVANCE</b><span>Coordinates platform operations and the customer journey across the mobility platform.</span></button>
              <button type="button" data-testid="button-capability-fleetsure" aria-pressed={activeNode === 'sure'} onClick={() => setActiveNode('sure')} className={`system-node node-sure ${activeNode === 'sure' ? 'selected' : ''}`}><span className="node-art art-sure"><ShieldCheck size={18} /></span><b>FLEETSURE</b><span>Potential ecosystem role is subject to verification. No service or coverage is implied.</span></button>
            </div>
            <div className="capability-detail" aria-live="polite" data-testid="status-selected-capability" data-reveal>
              <div className="capability-copy">
                <div className="eyebrow">Selected capability</div>
                <h3>{activeCapability.title}</h3>
                <p>{activeCapability.description}</p>
              </div>
              <div className={`capability-artwork${activeCapability.image ? '' : ' no-photo'}`}>
                {activeCapability.image ? (
                  <img src={activeCapability.image} alt={activeCapability.imageAlt} loading="lazy" />
                ) : (
                  <ShieldCheck size={54} aria-hidden="true" />
                )}
                <span className="artwork-tag">{activeCapability.artLabel}</span>
              </div>
            </div>
            <div className="partner-ribbon" data-reveal><span className="eyebrow">Portfolio oversight</span><img className="partner-art" src="/brand-assets/terranova-landscape.jpg" alt="" /><img src="/brand-assets/terranova-logo.png" alt="TerraNova Infrastructure Group" /><p>TerraNova provides portfolio-level oversight.</p></div>
            <p className="system-caption">Terra Belle Foundation is a separate public-benefit organization and is not a VoltRide customer service. Entity roles and service scopes should be confirmed before contracting.</p>
          </div>
        </section>

        <section className="charge-section" id="infrastructure">
          <div className="wrap charge-grid" data-reveal>
            <div className="charge-copy">
              <div className="eyebrow">04 / Energy & operations</div>
              <h2 className="display">Charging belongs in the route plan.</h2>
              <p>Depot power, dwell windows, charger siting and the operating timetable are connected questions. Voltrium represents the charging-infrastructure capability in the platform; a site assessment establishes what may be feasible.</p>
              <p>Operational coordination through Autovance brings the customer journey and platform activities together. It is not a substitute for local approvals, utility input or engineering validation.</p>
              <div className="charge-points">
                <div className="charge-point"><b>Site context</b>Space, access and electrical readiness</div>
                <div className="charge-point"><b>Route rhythm</b>Schedules, turnaround and dwell time</div>
                <div className="charge-point"><b>Operations</b>Coordination across the platform</div>
              </div>
            </div>
            <div className="charge-photo">
              <img src="/brand-assets/charging-depot.jpg" alt="Illustrative electric coach charging depot" loading="lazy" />
              <span>Charging equipment reference · illustrative</span>
            </div>
          </div>
        </section>

        <section className="lifecycle" id="battery">
          <div className="wrap lifecycle-grid" data-reveal>
            <div>
              <div className="eyebrow">05 / Battery lifecycle</div>
              <h2 className="display">The battery story does not end at the depot.</h2>
              <p>VoltCycle represents battery leasing and lifecycle services within the wider platform. The right structure depends on vehicle selection, commercial design and what an operator needs to manage over time.</p>
              <p>Battery ownership, leasing availability, residual value, reuse pathways and end-of-life processes are not assumed. They require verification and clear contractual definition.</p>
              <div className="cycle-steps"><div className="cycle-step">Vehicle<br />integration</div><div className="cycle-step">In-use<br />management</div><div className="cycle-step">Lifecycle<br />pathway</div></div>
            </div>
            <div className="cycle-mark"><img src="/brand-assets/battery-pack.jpg" alt="Illustrative electric coach battery pack" loading="lazy" /><div className="cycle-badge"><img src="/brand-assets/voltcycle-logo.png" alt="VoltCycle Battery Lifecycle Management" /></div></div>
          </div>
        </section>

        <section className="section reference-section" id="oem">
          <div className="wrap">
            <div className="section-head">
              <div><div className="eyebrow">06 / Vehicle landscape</div><h2 className="display">Explore the landscape.<br />Verify the particulars.</h2></div>
              <p>OEM names and vehicles below are illustrative references for discussion — not an inventory, confirmed offer or statement of commercial relationship.</p>
            </div>
            <div className="reference-grid">
              <article className="reference-card" data-reveal>
                <div className="reference-image"><img src="/brand-assets/kinglong-ecoach01_1792051092145.png" alt="Illustrative King Long electric coach reference image" loading="lazy" /></div>
                <div className="reference-text"><div className="eyebrow">Illustrative OEM reference</div><img className="oem-logo" src="/brand-assets/kinglong-logo.png" alt="King Long" /><h3>King Long</h3><p>Shown for vehicle landscape discussion only. No specific model, availability or relationship is represented.</p></div>
              </article>
              <article className="reference-card" data-reveal>
                <div className="reference-image"><img src="/brand-assets/yutong-05_1792051092143.webp" alt="Illustrative Yutong coach in an urban setting" loading="lazy" /></div>
                <div className="reference-text"><div className="eyebrow">Illustrative OEM reference</div><img className="oem-logo" src="/brand-assets/yutong-logo.png" alt="Yutong" /><h3>Yutong</h3><p>Shown for vehicle landscape discussion only. No specific model, availability or relationship is represented.</p></div>
              </article>
              <article className="reference-card" data-reveal>
                <div className="reference-image"><img src="/brand-assets/zhongtong-02_1792051092144.webp" alt="Illustrative Zhongtong coach reference image" loading="lazy" /></div>
                <div className="reference-text"><div className="eyebrow">Illustrative OEM reference</div><img className="oem-logo" src="/brand-assets/zhongtong-logo.png" alt="Zhongtong" /><h3>Zhongtong</h3><p>Shown for vehicle landscape discussion only. No specific model, availability or relationship is represented.</p></div>
              </article>
            </div>
            <div className="reference-disclaimer">Model details, image permissions, availability, warranty and service arrangements, and any OEM or distribution partnership status are subject to verification. No rights, appointment or partnership is implied.</div>
          </div>
        </section>

        <section className="contact-section" id="assessment">
          <div className="wrap contact-grid" data-reveal>
            <div>
              <div className="eyebrow">07 / Start with the operation</div>
              <h2 className="display">Bring us your route.</h2>
              <p className="intro">Tell us what you operate and what you are evaluating. A fleet assessment conversation can begin with routes, schedules, depot context and ownership preferences.</p>
              <p className="intro">For OEM, infrastructure or other partnership discussions, share the capability and geography you have in mind. Any partnership status or rights remain subject to verification.</p>
              <div className="contact-meta">East Africa · Intercity coach mobility</div>
            </div>
            <form className="lead-form" onSubmit={handleLeadSubmit}>
              <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" placeholder="Your name" required data-testid="input-name" /></div>
              <div className="field"><label htmlFor="organisation">Organisation</label><input id="organisation" name="organisation" autoComplete="organization" placeholder="Operator or organisation" required data-testid="input-organisation" /></div>
              <div className="field"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required data-testid="input-email" /></div>
              <div className="field"><label htmlFor="interest">I’m interested in</label><select id="interest" name="interest" defaultValue="" required data-testid="select-interest"><option value="" disabled>Select a topic</option><option>Fleet assessment</option><option>Coach ownership or leasing</option><option>Charging infrastructure</option><option>Battery lifecycle</option><option>Platform or partnership discussion</option></select></div>
              <div className="field full"><label htmlFor="context">A little context</label><textarea id="context" name="context" placeholder="Routes, fleet context, timing or the question you are working through" data-testid="input-context" /></div>
              <div className="form-bottom">
                <button className="button" type="submit" data-testid="button-submit-assessment">Prepare enquiry <ArrowRight aria-hidden="true" /></button>
                <p className="form-note">This form is a frontend demonstration. It does not send or store your details.</p>
              </div>
              <div className="form-status" role="status" aria-live="polite" data-testid="status-form">{formStatus}</div>
            </form>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-main">
            <div className="footer-brand"><img src="/brand-assets/voltride-logo.png" alt="VoltRide Mobility" /><span>Electric mobility.<br />Connected by design.</span></div>
            <nav className="footer-links" aria-label="Footer navigation"><a href="#approach">Approach</a><a href="#coaches">Coaches</a><a href="#infrastructure">Infrastructure</a><a href="#assessment">Fleet assessment</a></nav>
          </div>
          <div className="footer-bottom"><p>© {new Date().getFullYear()} VoltRide Mobility</p><p className="org-note">All vehicle images and OEM references are illustrative and subject to verification. No specifications, availability, commercial terms, warranty, service or environmental performance are represented. Terra Belle Foundation is a separate public-benefit organization.</p></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
