export default {
  '*': { type: 'page', theme: { collapsed: true, timestamp: false } },
  impressum: {
    display: 'hidden',
    theme: { sidebar: false, toc: false },
  },
  index: {
    display: 'hidden',
    theme: { layout: 'full', toc: false, typesetting: 'article' },
  },
  decks: {
    title: 'Folien',
    display: 'hidden',
  },
  prog: 'Programmieren',
  'web-prog': 'Web-Programmierung',
  mobile: 'Mobile Apps',
  praesi: 'Präsentationskompetenzen',
};
