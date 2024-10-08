const tailwindPlugin = require('eslint-plugin-tailwindcss');

const {recommended} = tailwindPlugin.configs;

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.tsx', '**/*.jsx'],
  plugins: {tailwindcss: tailwindPlugin},
  rules: {
    ...recommended.rules,
    'tailwindcss/no-custom-classname': 'off',
  },
  // https://github.com/francoismassart/eslint-plugin-tailwindcss#more-settings
  settings: {
    tailwindcss: {
      callees: ['classNames', 'clsx', 'ctl', 'twMerge'],
    }
  },
  languageOptions: {
    parserOptions: recommended.parserOptions,
  },
};
