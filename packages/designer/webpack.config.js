module.exports = (...args) => {
  const config = require('@leanup/stack-solid/webpack.config')(...args);
  const UnoCSS = require('@unocss/webpack').default;
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

  config.plugins.push(UnoCSS(), new MonacoWebpackPlugin());

  return config;
};
