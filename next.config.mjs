import nextra from 'nextra';

const withNextra = nextra({});

export default withNextra({
  async redirects() {
    return [
      // Flutter: Wetter-App ersetzt die frühere Todo-App
      {
        source: '/mobile/04-flutter-wetter/:path*',
        destination: '/mobile/04-flutter/:path*',
        permanent: true,
      },
      {
        source: '/mobile/04-flutter/:slug(01-intro|02-aufbau|03-widgets|04-state|05-data|06-ausblick)',
        destination: '/mobile/04-flutter',
        permanent: true,
      },
    ];
  },
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
      {
        source: '/praesi/vorlesung-praesentationen',
        destination: '/decks/vorlesung-praesentationen/index.html',
      },
      {
        source: '/praesi/vorlesung-praesentationen/',
        destination: '/decks/vorlesung-praesentationen/index.html',
      },
    ];
  },
});
