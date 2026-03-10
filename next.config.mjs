import nextra from 'nextra';

const withNextra = nextra({});

export default withNextra({
  async rewrites() {
    return [
      {
        source: '/praesi/vorlesung-praesentationen',
        destination: '/praesi/vorlesung-praesentationen/index.html',
      },
      {
        source: '/praesi/vorlesung-praesentationen/',
        destination: '/praesi/vorlesung-praesentationen/index.html',
      },
    ];
  },
});
