import 'tailwindcss/tailwind.css';
import 'nextra-theme-docs/style.css';
import '../styles/globals.css';
import Prism from 'prism-react-renderer/prism';

(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-groovy');
require('prismjs/components/prism-kotlin');

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
