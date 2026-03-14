import 'reveal.js/reset.css';
import 'reveal.js/reveal.css';
import '../../styles/reveal-dhbw.css';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SlidesLayout({ children }) {
  return children;
}
