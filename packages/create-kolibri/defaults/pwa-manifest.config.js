const path = require('path');
module.exports = {
  publicPath: '/kolibri/',
  name: 'KoliBri-Demo',
  short_name: 'KoliBri',
  description: '...',
  lang: 'de-DE',
  start_url: '/kolibri/',
  display: 'fullscreen',
  orientation: 'any',
  theme_color: '#fff',
  background_color: '#fff',
  filename: 'manifest.json',
  icons: [
    {
      src: path.resolve('public/assets/logo.kolibri.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      purpose: 'any maskable',
    },
  ],
  crossorigin: null,
  inject: true,
  fingerprints: true,
  ios: true,
  includeDirectory: true,
};
