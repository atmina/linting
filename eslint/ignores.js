// Global ignores
// https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores

module.exports = {
  ignores: [
    '**/build/*',
    '**/dist/*',
    '**/dist-*/*',
    '**/release/*',
    '**/storybook-static/*',
    '**/out/*',
    '**/.cache/*',
    '**/.next/*',
    '**/.vite/*',
    '**/*.generated*',
    '**/__generated__/*',
  ]
}
