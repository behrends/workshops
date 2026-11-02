import nextra from 'nextra';

const withNextra = nextra({});

export default withNextra({
  async rewrites() {
    // Static Reveal decks live under /decks/<slug>/ and share assets from /vendor/reveal.
    return [
      {
        source: '/decks/:deck',
        destination: '/decks/:deck/index.html',
      },
      {
        source: '/decks/:deck/',
        destination: '/decks/:deck/index.html',
      },
    ];
  },
});
