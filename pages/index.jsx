import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Workshops @ progcontent.com</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="description" content="Workshop Notizen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white text-center py-12 px-4 w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            Workshops zu Programmierung, Web- und App-Entwicklung
          </h1>
          <p className="text-lg text-slate-200">
            Praxisnah, aktuell und didaktisch fundiert
          </p>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 text-center py-12">
        <section className="max-w-4xl w-full">
          <h2 className="text-3xl font-semibold mb-4">
            Modernes Lernen
          </h2>
          <div className="text-left text-lg max-w-2xl mx-auto space-y-5 leading-relaxed text-gray-800">
            <p>
              Die Workshops behandeln praxisorientierte Szenarien der
              modernen Web- und App-Entwicklung. Ziel ist es,
              theoretische Konzepte anhand konkreter
              Implementierungsbeispiele anzuwenden, die im Rahmen von
              Live-Coding-Sessions demonstriert werden. Ergänzend
              kommen in den Veranstaltungen KI-gestützte Werkzeuge zum
              Einsatz &ndash; sowohl zur Programmierung als auch zur
              Unterstützung des Lernprozesses.
            </p>
            <p>
              Die bereitgestellten Notizen und Materialien verstehen
              sich als Ergänzung zu den Workshops, die in einer
              Mischung aus Präsenz- und Online-Formaten angeboten
              werden. Sie ersetzen keine vollständige Dokumentation,
              sondern dienen der Vertiefung und Unterstützung beim
              Lernen.
            </p>
            <p>
              Die Inhalte werden regelmäßig aktualisiert und
              erweitert. Sie stehen als Open Educational Resources
              (OER) unter der{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Lizenz CC-BY-NC-SA 4.0
              </a>{' '}
              zur Verfügung.
            </p>
          </div>
        </section>

        <section className="mt-8 max-w-3xl w-full text-left">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Liste der Workshops
          </h2>
          <ul className="space-y-4">
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <Link
                href="/prog"
                className="font-bold text-lg hover:underline"
              >
                Programmierung &mdash; Grundlagen der Programmierung
                mit JavaScript
              </Link>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <Link
                href="/mobile"
                className="font-bold text-lg hover:underline"
              >
                Entwicklung mobiler Apps
              </Link>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <Link
                href="/web-prog"
                className="font-bold text-lg hover:underline"
              >
                Web-Programmierung: HTML, CSS, JavaScript
              </Link>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <Link
                href="/praesi"
                className="font-bold text-lg hover:underline"
              >
                Präsentationskompetenzen mit modernen Technologien und
                Tools
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-center w-full h-auto border-t text-sm py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span>&copy; {new Date().getFullYear()} Erik Behrends</span>
          <Link
            href="https://www.behrends.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Website
          </Link>
          <Link
            href="/impressum"
            className="text-blue-600 hover:underline"
          >
            Impressum
          </Link>
        </div>
      </footer>
    </div>
  );
}
