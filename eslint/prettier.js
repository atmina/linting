// Turns off all rules that are unnecessary or might conflict with Prettier.
const prettierOverrides = require('eslint-config-prettier');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.{ts,tsx,js,jsx}'],
  rules: {
    ...prettierOverrides.rules,
  },
};
