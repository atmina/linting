# @atmina/linting

A collection of opinionated in-house linting rules.

- ESLint with TypeScript
- Prettier (as of version 2.0, this is [no longer integrated as an ESLint plugin](https://prettier.io/docs/en/integrating-with-linters.html#notes))

ESLint configuration is provided in the `eslint.config.js`, aka. "Flat Config" format.

## Quickstart

1. Install
   ```sh
   yarn add -D @atmina/linting
   # or
   pnpm add -D @atmina/linting
   ```
2. Run the CLI tool
   ```sh
   yarn linting
   # or
   pnpm linting
   ```
   This will set up the necessary dependencies and configurations for you.

## IDE Integration
In VS Code, use these workspace settings:

```json5
{
  "eslint.experimental.useFlatConfig": true,
  "eslint.workingDirectories": [
    // In a monorepo, specify linted packages here
    "frontend"
  ],
  // Optional
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

In WebStorm, go to Settings and enable ESLint (Select "Automatic ESLint Configuration"). If desired, enable
"Run eslint --fix on Save".

## Development
When working on `linting`, it may be useful to test its effects in a different project. To do so, link your local copy
of `linting` in the other project's package.json (works with pnpm and yarn). This may require restarting your IDE once
after setting up the link.

```JSON
{
  "devDependencies": {
    "@atmina/linting": "link:local/path/to/linting"
  }
}
```
