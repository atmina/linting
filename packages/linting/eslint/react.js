const {fixupPluginRules} = require('@eslint/compat');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

const {recommended, 'jsx-runtime': jsxRuntime} = reactPlugin.configs;

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.{ts,tsx,js,jsx}'],
  plugins: {
    react: reactPlugin,
    // This can be removed when eslint-plugin-react supports ESLint 9 by itself.
    // Track https://github.com/facebook/react/issues/28313
    'react-hooks': fixupPluginRules(reactHooksPlugin),
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...recommended.rules,
    ...jsxRuntime.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': ['warn', 'never'],
    'react/jsx-no-useless-fragment': ['warn', {allowExpressions: true}],
    'react/self-closing-comp': 'warn',
  },
};
