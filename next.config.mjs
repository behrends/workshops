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
      // React Native: Wetter-App ersetzt die frühere Todo-App
      {
        source: '/mobile/05-react-native-wetter/:path*',
        destination: '/mobile/05-react-native/:path*',
        permanent: true,
      },
      {
        source: '/mobile/05-react-native/:slug(01-setup|02-intro|03-app|04-components|05-todos-list|06-state|07-todo-input|08-next-steps)',
        destination: '/mobile/05-react-native',
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
