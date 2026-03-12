const speakerMode =
  new URLSearchParams(window.location.search).get('speaker') === '1';
const speakerStatus = document.getElementById('speaker-status');

function showSpeakerStatus(message) {
  if (!speakerStatus) return;
  speakerStatus.innerHTML = message;
  speakerStatus.hidden = false;
}

Reveal.initialize({
  hash: true,
  controls: false,
  center: true,
  margin: 0.015,
  slideNumber: true,
  pdfSeparateFragments: false,
  width: 1280,
  height: 720,
  plugins: [RevealNotes, RevealZoom],
}).then(() => {
  if (!speakerMode) {
    return;
  }

  const notesPlugin = Reveal.getPlugin('notes');
  if (!notesPlugin || typeof notesPlugin.open !== 'function') {
    showSpeakerStatus(
      'Präsentationsmodus nicht verfügbar - bitte mit <strong>S</strong> die Speaker View öffnen.',
    );
    return;
  }

  let popupHandle = null;
  const originalOpen = window.open.bind(window);

  window.open = (...args) => {
    popupHandle = originalOpen(...args);
    return popupHandle;
  };

  try {
    notesPlugin.open();
  } finally {
    window.open = originalOpen;
  }

  if (!popupHandle) {
    showSpeakerStatus(
      'Popup blockiert - bitte mit <strong>S</strong> die Speaker View öffnen.',
    );
  }
});
