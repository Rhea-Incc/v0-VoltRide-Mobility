type EditorialPages = typeof import('@/pages/editorial-pages');

let editorialPagesPromise: Promise<EditorialPages> | undefined;
const criticalAssets = [
  '/brand-assets/voltride-logo.png',
  '/brand-assets/e-coach-hero.jpg',
  '/brand-assets/electric-coach.jpg',
  '/brand-assets/charger-closeup.jpg',
  '/brand-assets/battery-pack.jpg',
];

export function preloadEditorialPages() {
  editorialPagesPromise ??= import('@/pages/editorial-pages');
  return editorialPagesPromise;
}

export function preloadCriticalAssets() {
  if (typeof document === 'undefined') return;

  const seen = new Set<string>();
  const preload = (url: string) => {
    if (!url || seen.has(url)) return;
    seen.add(url);

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };

  const schedule = typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 } as IdleDeadline), 0);

  schedule(() => {
    criticalAssets.forEach(preload);
  });
}