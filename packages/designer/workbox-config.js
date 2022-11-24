module.exports = {
  swDest: 'sw.js',
  runtimeCaching: [
    {
      urlPattern: /\.(css|gif|gz|jpg|js|png|html|json)$/,
      handler: 'CacheFirst',
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
};
