type EditorialPages = typeof import('@/pages/editorial-pages');

let editorialPagesPromise: Promise<EditorialPages> | undefined;

export function preloadEditorialPages() {
  editorialPagesPromise ??= import('@/pages/editorial-pages');
  return editorialPagesPromise;
}