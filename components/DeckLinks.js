export default function DeckLinks({ basePath }) {
  return (
    <div className="mt-4 grid gap-3">
      <a
        className="block rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 no-underline transition-colors hover:border-blue-400 hover:bg-blue-100 dark:border-blue-900/70 dark:bg-blue-950/40 dark:hover:border-blue-800 dark:hover:bg-blue-950/60"
        href={`/decks/${basePath}/`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="block text-base font-semibold text-blue-700 dark:text-blue-300">
          Folien öffnen
        </span>
        <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
          Normale Browser-Ansicht des Reveal-Decks
        </span>
      </a>
      <a
        className="block rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 no-underline transition-colors hover:border-blue-400 hover:bg-blue-100 dark:border-blue-900/70 dark:bg-blue-950/40 dark:hover:border-blue-800 dark:hover:bg-blue-950/60"
        href={`/decks/${basePath}/?speaker=1`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="block text-base font-semibold text-blue-700 dark:text-blue-300">
          Präsentationsmodus öffnen
        </span>
        <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
          Startet direkt mit Speaker View, falls der Browser das Popup zulässt
        </span>
      </a>
    </div>
  );
}
