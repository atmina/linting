# @atmina/linting

A collection of optionated in-house linting rules.

- ESLint with TypeScript
- Prettier (via ESLint)

ESLint configuration is provided in the `eslint.config.js`, aka. "Flat Config" format.

```js
// eslint.config.js
module.exports = require('@atmina/linting/eslint/recommended');
```

```js
// .prettierrc.js
module.exports = require('@atmina/linting/prettier');
```