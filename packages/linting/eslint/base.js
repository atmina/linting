const eslintJs = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.{ts,tsx,js,jsx}'],
  plugins: {import: importPlugin},
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  rules: {
    ...eslintJs.configs.recommended.rules,
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        alphabetize: {order: 'asc', caseInsensitive: true},
      },
    ],
    'arrow-body-style': ['warn', 'as-needed'],
    'no-console': ['warn', {allow: ['info', 'warn', 'error', 'debug']}],
  },
};
