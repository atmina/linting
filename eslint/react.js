const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

const {recommended, 'jsx-runtime': jsxRuntime} = reactPlugin.configs;

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.tsx', '**/*.jsx'],
  plugins: {react: reactPlugin, 'react-hooks': reactHooksPlugin},
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
