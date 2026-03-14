import {
  Footer,
  Layout,
  Navbar,
} from 'nextra-theme-docs';
import { Search } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import '../globals.css';

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

export default async function SiteLayout({ children }) {
  return (
    <Layout
      navbar={navbar}
      pageMap={await getPageMap()}
      docsRepositoryBase="https://github.com/behrends/workshops/tree/main"
      editLink="Diese Seite bei GitHub →"
      feedback={{ content: null }}
      footer={footer}
      copyPageButton={false}
      search={
        <Search
          emptyResult="Keine Ergebnisse"
          errorText="Fehler beim Laden der Suchergebnisse"
          loading="Lädt..."
          placeholder="Suchen..."
        />
      }
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      toc={{
        title: 'Auf dieser Seite',
        backToTop: 'Nach oben scrollen',
      }}
    >
      {children}
    </Layout>
  );
}
