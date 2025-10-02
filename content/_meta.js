export default {
  '*': { type: 'page', theme: { timestamp: false } },
  impressum: {
    display: 'hidden',
    theme: { sidebar: false, toc: false },
  },
  index: {
    display: 'hidden',
    theme: {
      layout: 'full',
      toc: false,
      typesetting: 'article',
    },
  },
  prog: 'Programmieren',
  'web-prog': 'Web-Programmierung',
  mobile: 'Mobile Apps',
  praesi: 'Präsentationskompetenzen',
};
