const { FlatCompat } = require('@eslint/eslintrc');
const ignores = require('./common/ignores');

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  ignores,
  ...compat.extends('plugin:tailwindcss/recommended'),
};
