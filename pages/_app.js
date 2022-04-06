import '../styles.css';
import 'nextra-theme-docs/style.css';
import Prism from 'prism-react-renderer/prism';

(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-groovy');
require('prismjs/components/prism-kotlin');

export default function Nextra({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
