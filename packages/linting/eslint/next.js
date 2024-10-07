const react = require('./react');
const {fixupConfigRules} = require('@eslint/compat');

/**
 * @type {(nextPlugin: import('eslint').ESLint.Plugin) => import('@eslint/compat').FixupConfig}
 */
module.exports = (nextPlugin) => {
  // We don't want to add the Next.js plugin as a dependency, so we just ask
  // the caller to provide it (attempting to `require()` it here would
  // fail).
  return fixupConfigRules({
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {'@next/next': nextPlugin, ...react.plugins},
    settings: {...react.settings},
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...react.rules,
    },
  // fixupConfigRules always returns an array. Since we only pass one object, it should be safe to just return the first
  // element to avoid a breaking change
  })[0];
};
