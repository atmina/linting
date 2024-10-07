/**
 * @type {import('prettier/index').Config}
 */
module.exports = {
  // Note: Defaults are commented out.

  // Line length that the printer will wrap on.
  // printWidth: 80,

  // Number of spaces per indentation-level.
  // tabWidth: 2,

  // useTabs: false,

  // Semicolons.
  // semi: true,

  singleQuote: true,

  // quoteProps: 'as-needed',

  // Use single quotes instead of double quotes in JSX.
  jsxSingleQuote: true,

  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures.
  trailingComma: 'all',

  // Include parentheses around a sole arrow function parameter: (x) => x.
  // (Default 'always' since 2.0.0)
  arrowParens: 'always',

  // Print spaces between brackets in object literals.
  bracketSpacing: false,

  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being
  // alone on the next line (does not apply to self-closing elements).
  // bracketSameLine: false,

  // Specify the global whitespace sensitivity for HTML, Vue, Angular, and Handlebars.
  // htmlWhitespaceSensitivity: 'css',

  // Line endings.
  // (Default 'lf' since 2.0.0)
  endOfLine: 'lf',

  // Control whether Prettier formats quoted code embedded in the file.
  embeddedLanguageFormatting: 'auto',

  // Enforce single attribute per line in HTML, Vue and JSX.
  // singleAttributePerLine: false,

  overrides: [
    {
      files: ['*.md', '*.yml', '*.yaml'],
      options: {
        tabWidth: 4,
      },
    },
  ],
};
