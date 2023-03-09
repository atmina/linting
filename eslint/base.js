const eslintJs = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');

const ignores = [
  '**/node_modules',
  '**/build',
  '**/dist',
  '**/.cache',
  '**/.storybook',
  '**/.next',
];

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.{ts,tsx,js,jsx}'],
  ignores,
  plugins: { import: importPlugin },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    ...eslintJs.configs.recommended.rules,
    ...importPlugin.configs.recommended.rules,
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
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
