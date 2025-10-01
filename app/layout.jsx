import {
  Footer,
  LastUpdated,
  Layout,
  Navbar,
} from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import './globals.css';

export const metadata = {
  title: {
    default: 'progcontent',
    template: '%s',
  },
  openGraph: {
    url: 'https://workshops.progcontent.com',
    siteName: 'Workshops Progcontent',
    locale: 'de',
    type: 'website',
  },
};

const navbar = (
  <Navbar
    logo={<b>Workshops</b>}
    projectLink="https://github.com/behrends/workshops"
  />
);
const footer = (
  <Footer>
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
  </Footer>
);

export default async function RootLayout({ children }) {
  return (
    <html
      lang="de"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/behrends/workshops/tree/main"
          editLink="Diese Seite bei GitHub →"
          feedback={{ content: null }}
          footer={footer}
          lastUpdated={
            <LastUpdated locale="de">Zuletzt geändert am</LastUpdated>
          }
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{
            title: 'Auf dieser Seite',
            backToTop: 'Nach oben scrollen',
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
