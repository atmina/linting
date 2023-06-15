// Global ignores
// https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores

module.exports = {
  ignores: [
    '**/build/*',
    '**/dist/*',
    '**/storybook-static/*',
    '**/.cache/*',
    '**/.next/*',
    '**/*.generated*',
    '**/__generated__/*',
  ]
}
