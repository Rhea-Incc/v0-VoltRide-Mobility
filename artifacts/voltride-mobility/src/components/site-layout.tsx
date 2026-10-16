import { useState, type ReactNode } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'wouter';

const partnerLinks = [
  { href: '/partners/king-long', label: 'King Long' },
  { href: '/partners/yutong', label: 'Yutong' },
  { href: '/partners/zhongtong', label: 'Zhongtong' },
  { href: '/voltrium', label: 'Voltrium' },
  { href: '/voltcycle', label: 'VoltCycle' },
  { href: '/terra-belle', label: 'Terra Belle Foundation' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="wrap topbar">
      <Link className="brand" href="/" aria-label="VoltRide Mobility home" onClick={closeMenu}>
        <img src="/brand-assets/voltride-logo.png" alt="VoltRide Mobility" width="188" height="48" />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={`nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
        <Link href="/approach" onClick={closeMenu}>Our approach</Link>
        <Link href="/coaches" onClick={closeMenu}>Coaches</Link>
        <Link href="/voltrium" onClick={closeMenu}>Charging</Link>
        <Link href="/ecosystem" onClick={closeMenu}>Ecosystem</Link>
        <details className="nav-partners">
          <summary>Partners</summary>
          <div className="nav-partner-menu">
            {partnerLinks.map((partner) => (
              <Link key={partner.href} href={partner.href} onClick={closeMenu}>{partner.label}</Link>
            ))}
          </div>
        </details>
        <Link className="button nav-contact" href="/contact" onClick={closeMenu}>
          Contact <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/brand-assets/voltride-logo.png" alt="VoltRide Mobility" width="142" height="38" />
            <span>Electric mobility.<br />Connected by design.</span>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/approach">Approach</Link>
            <Link href="/coaches">Coaches</Link>
            <Link href="/voltrium">Charging</Link>
            <Link href="/voltcycle">Battery lifecycle</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} VoltRide Mobility</p>
          <p className="org-note">VoltRide coordinates coach, energy and operations partners. Commercial arrangements, specifications and service scope are confirmed for each project.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}