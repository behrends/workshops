import { getDeckCatalog } from '../lib/decks/catalog.mjs';

function linkClassName(tone = 'primary') {
  if (tone === 'secondary') {
    return 'inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-200 dark:hover:text-white';
  }

  return 'inline-flex items-center justify-center rounded-full bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200';
}

function getDeckBadge(deck) {
  if (deck.revealHref && deck.pdfs.length > 0) {
    return 'Online + PDF';
  }

  if (deck.revealHref) {
    return 'Online';
  }

  return 'PDF';
}

function getDeckDescription(deck) {
  if (deck.description) {
    return deck.description;
  }

  if (deck.revealHref && deck.pdfs.length > 0) {
    return 'Online verfügbare Präsentation mit zusätzlicher PDF-Version.';
  }

  if (deck.revealHref) {
    return 'Online verfügbare Präsentation mit direktem Zugriff auf die Folien.';
  }

  return 'PDF-Fassung der Präsentation zum direkten Öffnen oder Herunterladen.';
}

export default async function DeckIndex() {
  const decks = await getDeckCatalog();
  const titleCounts = decks.reduce((counts, deck) => {
    counts.set(deck.title, (counts.get(deck.title) || 0) + 1);
    return counts;
  }, new Map());

  return (
    <div className="not-prose my-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(247,244,236,0.95),rgba(255,255,255,0.98)_52%,rgba(226,232,240,0.95))] px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98)_55%,rgba(30,41,59,0.96))] dark:shadow-[0_18px_70px_rgba(2,6,23,0.45)] sm:px-8 sm:py-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent dark:via-slate-500/40" />
        <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-200/10" />
        <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-400/10" />
        <div className="relative">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Präsentationen
          </p>
          <h2
            className="deck-index-display max-w-3xl text-3xl leading-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            Präsentationen und Foliensätze im Überblick
          </h2>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-7 text-slate-700 dark:text-slate-300">
            Hier finden Sie veröffentlichte Präsentationen zu Workshops, Lehrveranstaltungen
            und Vorträgen. Online-Versionen und PDF-Fassungen sind direkt verlinkt.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full border border-slate-300/80 bg-white/75 px-4 py-2 text-sm text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            {decks.length} Präsentation{decks.length === 1 ? '' : 'en'}
          </div>
        </div>
      </section>

      {decks.length === 0 ? (
        <section className="mt-8 rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
          Zurzeit sind hier noch keine veröffentlichten Präsentationen hinterlegt.
        </section>
      ) : null}

      {decks.length > 0 ? (
        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {decks.map((deck) => (
            <article
              key={deck.slug}
              className="group relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/70 dark:shadow-[0_12px_40px_rgba(2,6,23,0.32)] dark:hover:shadow-[0_20px_50px_rgba(2,6,23,0.42)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-slate-900 to-sky-500 dark:from-amber-300 dark:via-slate-100 dark:to-sky-300" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  {titleCounts.get(deck.title) > 1 ? (
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      {deck.label}
                    </p>
                  ) : null}
                  <h3
                    className={`deck-index-display ${titleCounts.get(deck.title) > 1 ? 'mt-3' : ''} text-2xl leading-tight text-slate-950 dark:text-white`}
                  >
                    {deck.title}
                  </h3>
                  {deck.subtitle ? (
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {deck.subtitle}
                    </p>
                  ) : null}
                </div>
                <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  {getDeckBadge(deck)}
                </div>
              </div>

              <p className="mt-5 min-h-14 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {getDeckDescription(deck)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {deck.revealHref ? (
                  <a
                    className={linkClassName()}
                    href={deck.revealHref}
                    target="_blank"
                    rel="noopener"
                  >
                    Präsentation öffnen
                  </a>
                ) : null}

                {deck.speakerHref ? (
                  <a
                    className={linkClassName('secondary')}
                    href={deck.speakerHref}
                    target="_blank"
                    rel="noopener"
                  >
                    Referentenansicht
                  </a>
                ) : null}

                {deck.pdfs.map((pdf) => (
                  <a
                    key={pdf.href}
                    className={linkClassName('secondary')}
                    href={pdf.href}
                    target="_blank"
                    rel="noopener"
                  >
                    {pdf.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
