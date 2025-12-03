module.exports = {
root: true,
extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
parserOptions: {
project: 'tsconfig.json',
tsconfigRootDir: __dirname,
sourceType: 'module',
},
plugins: ['@typescript-eslint'],
rules: {
eqeqeq: 'error',
},
};
