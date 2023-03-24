// Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
const prettierPlugin = require('eslint-plugin-prettier');

// Turns off all rules that are unnecessary or might conflict with Prettier.
const prettierOverrides = require('eslint-config-prettier');

const ignores = require('./common/ignores');
const prettierOptions = require('../prettier');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.{ts,tsx,js,jsx}'],
  ignores,
  plugins: {prettier: prettierPlugin},
  rules: {
    ...prettierOverrides.rules,
    ...prettierPlugin.configs.recommended.rules,
    // Note: this effectively locks in our Prettier configuration (ignoring
    // .prettierrc completely). Since this is an opinionated setup, we probably
    // don't want to allow customization anyway.
    'prettier/prettier': ['error', prettierOptions],
  },
};
