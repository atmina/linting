/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
  require('./ignores'),
  require('./base'),
  require('./typescript'),
  require('./prettier'),
];
