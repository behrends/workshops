import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Workshops</title>
        <meta name="description" content="Workshop Notizen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Workshops</h1>

        <p className="mt-3 text-2xl">
          Ablauf und Notizen zum Live Coding
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-full mt-6 sm:w-full">
          <Link href="/prog">
            <h1 className="text-3xl font-bold cursor-pointer">
              Programmierung (TIF)
            </h1>
          </Link>
        </div>

        <div className="text-3xl font-bold flex flex-wrap items-center justify-around max-w-full mt-6 sm:w-full">
          <Link href="/mobile">
            <h1 className="cursor-pointer">
              Entwicklung mobiler Apps (TIF)
            </h1>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-around max-w-full mt-6 sm:w-full">
          <Link href="/web-prog">
            <h1 className="text-3xl font-bold cursor-pointer">
              Web-Programmierung (WWI/WDS)
            </h1>
          </Link>
        </div>

        <div className="text-3xl font-bold flex flex-wrap items-center justify-around max-w-full mt-6 sm:w-full">
          <Link href="/praesi">
            <h1 className="cursor-pointer">
              Präsentationskompetenzen (WWI)
            </h1>
          </Link>
        </div>

        <div className="text-3xl font-bold flex flex-wrap items-center justify-around max-w-full mt-6 sm:w-full">
          <Link href="/kennenlerntag">
            <h1 className="cursor-pointer">
              Kennenlerntag (TIF und WWI)
            </h1>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-12 border-t">
        <span className="flex items-center justify-center">
          <span>{`© ${new Date().getFullYear()}`}</span>
          <a
            rel="author"
            href="https://www.behrends.io"
            target="_blank"
            className="ml-8"
          >
            Erik Behrends
          </a>
        </span>
        <a className="ml-8" href="/impressum">
          Impressum
        </a>
      </footer>
    </div>
  );
}
