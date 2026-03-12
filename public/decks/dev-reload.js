(function enableDeckLiveReload() {
  const localHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0']);
  const localHostPattern =
    /^(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})$/;
  const host = window.location.hostname;

  if (
    !localHosts.has(host) &&
    !localHostPattern.test(host)
  ) {
    return;
  }

  if (!/^https?:$/.test(window.location.protocol)) {
    return;
  }

  const baseHref = document.querySelector('base')?.getAttribute('href') || '';
  const baseMatch = baseHref.match(/\/decks\/([^/]+)\//);
  const pathMatch = window.location.pathname.match(/\/decks\/([^/]+)/);
  const deckSlug = baseMatch?.[1] || pathMatch?.[1];

  if (!deckSlug) {
    return;
  }

  const endpoint =
    `${window.location.protocol}//${window.location.hostname}:35729/__deck_reload`;
  const sharedDeckFiles = new Set([
    'public/decks/dev-reload.js',
    'public/decks/reveal-init.js',
    'public/decks/shared-deck.css',
  ]);
  const currentDeckPrefix = `public/decks/${deckSlug}/`;

  let reloading = false;

  function normalizePath(value) {
    return String(value || '').replaceAll('\\', '/');
  }

  function shouldReload(changedPath) {
    if (!changedPath) {
      return false;
    }

    if (changedPath.startsWith(currentDeckPrefix)) {
      return true;
    }

    if (changedPath.startsWith('public/vendor/reveal/')) {
      return true;
    }

    if (sharedDeckFiles.has(changedPath)) {
      return true;
    }

    return false;
  }

  const source = new EventSource(endpoint);

  source.onmessage = (event) => {
    let payload;

    try {
      payload = JSON.parse(event.data);
    } catch {
      return;
    }

    const changedPath = normalizePath(payload?.path);

    if (!shouldReload(changedPath) || reloading) {
      return;
    }

    reloading = true;
    source.close();
    window.location.reload();
  };

  source.onerror = () => {};
})();
