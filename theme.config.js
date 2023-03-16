export default {
  docsRepositoryBase:
    'https://github.com/behrends/workshops/tree/main',
  editLink: {
    text: 'Diese Seite bei GitHub →',
  },
  feedback: {
    content: undefined,
  },
  footer: {
    text() {
      return (
        <span>
          <abbr
            title="Dieses Werk ist lizenziert unter einer Creative Commons Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen 4.0 International Lizenz."
            style={{ cursor: 'help', marginRight: '10px' }}
          >
            <a
              rel="license"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              CC BY-NC-SA 4.0
            </a>
          </abbr>
          <span>
            {`© ${new Date().getFullYear()} `}
            <a
              rel="author"
              href="https://www.behrends.io"
              target="_blank"
            >
              Erik Behrends
            </a>
          </span>
          <a href="/impressum" className="impressum">
            Impressum
          </a>
        </span>
      );
    },
  },
  gitTimestamp: undefined,
  head: (
    <>
      <meta name="msapplication-TileColor" content="#fff" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="description" content="Workshops Notizen" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@behrends" />
      <meta property="og:title" content="Workshops Notizen" />
      <meta property="og:description" content="Workshops Notizen" />
      <meta name="apple-mobile-web-app-title" content="Workshops" />
    </>
  ),
  logo: <span className="font-bold">Workshops</span>,
  project: {
    link: 'https://github.com/behrends/workshops',
  },
  search: {
    placeholder: 'Inhalte durchsuchen…',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s',
    };
  },
  toc: {
    title: 'Auf dieser Seite',
  },
};
