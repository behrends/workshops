const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_stork: false,
});
module.exports = withNextra();
// server side rendering on netlify
// https://docs.netlify.com/configure-builds/common-configurations/next-js/
module.exports.target = 'serverless';
