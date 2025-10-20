module.exports = {
root: true,
parser: '@typescript-eslint/parser',
parserOptions: {
sourceType: 'module',
ecmaVersion: 2022,
tsconfigRootDir: __dirname,
project: ['./tsconfig.json'],
},
plugins: ['@typescript-eslint'],
extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
env: {
node: true,
es2022: true,
},
ignorePatterns: ['dist/', 'test/**/*.mjs'],
overrides: [
{
files: ['test/**/*.mjs'],
env: {
node: true,
es2022: true,
},
parserOptions: {
sourceType: 'module',
ecmaVersion: 2022,
},
extends: ['eslint:recommended'],
},
],
};
