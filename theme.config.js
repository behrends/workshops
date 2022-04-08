export default {
  projectLink: 'https://github.com/behrends/workshops',
  github: 'https://github.com/behrends/workshops', // project repo
  docsRepositoryBase: 'https://github.com/behrends/workshops', // docs repo
  titleSuffix: '',
  nextLinks: true,
  prevLinks: true,
  search: true,
  unstable_stork: false,
  darkMode: true,
  defaultMenuCollapsed: true,
  feedbackLink: () => 'Fragen / Rückmeldung auf GitHub →',
  feedbackLabels: 'feedback',
  floatTOC: true,
  font: true,
  footer: true,
  footerEditLink: 'Diese Seite bei GitHub →',
  footerText: (
    <span>
      <abbr
        title="Dieses Werk ist lizenziert unter einer Creative Commons Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen 4.0 International Lizenz."
        style={{ cursor: 'help', marginRight: '10px' }}
      >
        <a
          rel="license"
          href="https://creativecommons.org/licenses/by-sa/4.0/"
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
      <a href="/impressum" style={{ marginLeft: '10px' }}>
        Impressum
      </a>
    </span>
  ),
  logo: <span className="font-extrabold">Workshops</span>,
  head: (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="description" content="Workshops Notizen" />
      <meta name="og:title" content="Workshops Notizen" />
    </>
  ),
};
