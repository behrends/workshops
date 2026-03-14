import { NotFoundPage } from 'nextra-theme-docs';

export default function NotFound() {
  return (
    <NotFoundPage content={null} labels="broken-link">
      <h1 className="text-3xl font-bold">Seite nicht gefunden</h1>
      <a className="text-blue-500" href="/">
        Zur Startseite &rarr;
      </a>
    </NotFoundPage>
  );
}
