const importPlugin = require('eslint-plugin-import');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');
const ignores = require('./common/ignores');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const config = {
  files: ['**/*.{ts,tsx}'],
  ignores,
  plugins: { '@typescript-eslint': typescriptEslintPlugin },
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      sourceType: 'module',
      project: ['./tsconfig.json'],
    },
  },
  settings: {
    ...importPlugin.configs.typescript.settings,
  },
  rules: {
    ...typescriptEslintPlugin.configs['eslint-recommended'].overrides[0].rules,
    ...typescriptEslintPlugin.configs.recommended.rules,
    ...importPlugin.configs.typescript.rules,
    '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],
    '@typescript-eslint/eslint no-unused-vars': [
      'warn',
      {ignoreRestSiblings: true},
    ],
  },
};

config.settings['import/resolver'].typescript = true;

module.exports = config;