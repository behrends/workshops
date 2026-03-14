export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold">Seite nicht gefunden</h1>
      <p className="mt-4 text-slate-700">
        Die angeforderte Seite existiert nicht oder ist nicht verfuegbar.
      </p>
      <a className="mt-6 inline-block text-blue-600" href="/">
        Zur Startseite
      </a>
    </main>
  );
}
