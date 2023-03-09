/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
  require('./base'),
  require('./typescript'),
  require('./prettier'),
];
