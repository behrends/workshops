import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Workshops @ progcontent.com</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          name="description"
          content="Workshop Notizen von Erik Behrends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="relative min-h-[240px] sm:min-h-[300px] w-full">
        <Image
          src="/images/workshops-hero.png"
          alt="Workshops Visual"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-900/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2 text-shadow">
            Workshops zu Programmierung, Web- und App-Entwicklung
          </h1>
          <p className="text-lg text-slate-200 text-shadow">
            Praxisnah, aktuell und didaktisch fundiert &ndash; Prof.
            Dr. Erik Behrends
          </p>
        </div>
      </header>

      <main className="flex flex-col items-center justify-start flex-1 px-4 sm:px-6 md:px-8 py-12 w-full">
        <section className="max-w-6xl w-full mb-12">
          <div className="text-left text-lg max-w-3xl xl:max-w-5xl mx-auto space-y-5 leading-relaxed text-gray-800 px-4">
            <p>
              Die Workshops behandeln praxisorientierte Szenarien der
              modernen Programmierung, Web- und App-Entwicklung. Ziel
              ist es, theoretische Konzepte anhand konkreter
              Implementierungsbeispiele anzuwenden, die im Rahmen von
              Live-Coding-Sessions demonstriert werden. Ergänzend
              kommen KI-gestützte Werkzeuge zum Einsatz &mdash; sowohl
              zur Programmierung als auch zur Unterstützung des
              Lernprozesses.
            </p>
            <p>
              Die bereitgestellten Notizen und Materialien verstehen
              sich als Ergänzung zu den Workshops, die in einer
              Mischung aus Präsenz- und Online-Formaten angeboten
              werden. Sie ersetzen keine vollständige Dokumentation,
              sondern dienen der Vertiefung und Unterstützung beim
              Lernen. Die Inhalte werden regelmäßig aktualisiert und
              erweitert. Sie stehen als Open Educational Resources
              (OER) unter der{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 no-underline hover:underline hover:text-slate-700 transition"
              >
                Lizenz CC BY-NC-SA 4.0
              </a>{' '}
              zur Verfügung.
            </p>
          </div>
        </section>

        <section className="max-w-5xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Workshops
          </h2>
          <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                href: '/prog',
                title:
                  'Programmieren — Grundlagen und Einstieg mit JavaScript',
                icon: '💻',
              },
              {
                href: '/mobile',
                title:
                  'App-Entwicklung (Jetpack Compose für Android, React Native, …)',
                icon: '📱',
              },
              {
                href: '/web-prog',
                title: 'Web-Programmierung: HTML, CSS, JavaScript',
                icon: '🌐',
              },
              {
                href: '/praesi',
                title: 'Präsentation moderner Technologien und Tools',
                icon: '🗣️',
              },
            ].map(({ href, title, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="relative flex items-center bg-white h-full p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 text-xl">
                      {icon}
                    </div>
                    <div className="font-semibold text-base text-slate-900 text-left">
                      {title}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="mt-12 w-full border-t bg-gray-100 text-sm py-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 text-gray-600">
          <span>&copy; {new Date().getFullYear()} Erik Behrends</span>
          <div className="flex gap-4">
            <Link
              href="https://www.behrends.io"
              className="hover:underline text-blue-600"
              target="_blank"
            >
              Website
            </Link>
            <Link
              href="/impressum"
              className="hover:underline text-blue-600"
            >
              Impressum
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
