const { FlatCompat } = require('@eslint/eslintrc');
const ignores = require('./common/ignores');

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  ignores,
  ...compat.extends('next'),
  rules: {
    // /app: The root layout actually does need a <head> element.
    '@next/next/no-head-element': 'off',
  },
};
