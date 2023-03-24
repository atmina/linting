const tailwindPlugin = require('eslint-plugin-tailwindcss');
const ignores = require('./common/ignores');

const {recommended} = tailwindPlugin.configs;

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.tsx', '**/*.jsx'],
  ignores,
  plugins: {tailwindcss: tailwindPlugin},
  rules: {
    ...recommended.rules,
    'tailwindcss/no-custom-classname': 'off',
  },
  languageOptions: {
    parserOptions: recommended.parserOptions,
  },
};
