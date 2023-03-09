const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = compat.extends('plugin:tailwindcss/recommended');
