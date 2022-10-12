const config = require('@leanup/stack/.eslintrc');

config.overrides[0].rules['@typescript-eslint/no-unsafe-member-access'] = ['warn'];

module.exports = config;
