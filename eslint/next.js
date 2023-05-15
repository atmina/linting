const ignores = require('./common/ignores');
const react = require('./react');

/**
 * @type {(nextPlugin: import('eslint').ESLint.Plugin) => import('eslint').Linter.FlatConfig}
 */
module.exports = (nextPlugin) => {
  // We don't want to add the Next.js plugin as a dependency, so we just ask
  // the caller to provide it (attempting to `require()` it here would
  // fail).
  return {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores,
    plugins: {'@next/next': nextPlugin, ...react.plugins},
    settings: {...react.settings},
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...react.rules,
    },
  };
};
