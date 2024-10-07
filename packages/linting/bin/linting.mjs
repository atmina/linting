#!/usr/bin/env node

import {dirname, resolve} from 'node:path';
import {copyFile, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {pkgUp} from 'pkg-up';
import {parseNi, run as runNi, getCommand, detect} from '@antfu/ni';
// ni uses this so we do too
import prompts from '@posva/prompts';

const TEMPLATE_CJS = `
/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
{{configs}}
];
`.trimStart();

const TEMPLATE_ESM = `
{{imports}}

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
{{configs}}
];
 
export default config;
`.trimStart();

const ni = (args) => {
  return runNi(parseNi, args);
};

const confirm = async (message) => {
  return (
    await prompts({
      type: 'confirm',
      name: 'confirm',
      message: message,
      initial: true,
    })
  ).confirm;
};

const createConfig = (pkg) => {
  const isEsm = pkg.type === 'module';
  console.info(
    'Format (based on package.json -> type):',
    isEsm ? 'ES Module' : 'CommonJS',
  );
  const dependencies = new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ]);
  const template = isEsm ? TEMPLATE_ESM : TEMPLATE_CJS;
  const configs = isEsm
    ? ['...recommended']
    : [`...require('@atmina/linting/eslint/recommended')`];
  const imports = isEsm
    ? [`import recommended from '@atmina/linting/eslint/recommended.js'`]
    : [];

  if (dependencies.has('tailwindcss')) {
    console.info('+ Tailwind CSS');
    if (isEsm) {
      imports.push(`import tailwind from '@atmina/linting/eslint/tailwind.js'`);
      configs.push('tailwind');
    } else {
      configs.push(`require('@atmina/linting/eslint/tailwind')`);
    }
  }

  // React config is included in the Next.js config
  if (dependencies.has('react') && !dependencies.has('next')) {
    console.info('+ React');
    if (isEsm) {
      imports.push(`import react from '@atmina/linting/eslint/react.js'`);
      configs.push('react');
    } else {
      configs.push(`require('@atmina/linting/eslint/react')`);
    }
  }

  if (dependencies.has('next')) {
    console.info('+ Next.js');
    if (isEsm) {
      imports.push(`import next from '@atmina/linting/eslint/next.js'`);
      imports.push(`import nextPlugin from '@next/eslint-plugin-next'`);
      configs.push('next(nextPlugin)');
    } else {
      // TODO - Remove compat layer once https://github.com/vercel/next.js/issues/64409 is closed
      imports.push(`const {fixupConfigRules} = require('@eslint/compat')`);
      configs.push(
        `...fixupConfigRules(require('@atmina/linting/eslint/next')(require('@next/eslint-plugin-next')))`,
      );
    }
  }

  return template
    .replace('{{configs}}', configs.map((config) => `  ${config},`).join('\n'))
    .replace('{{imports}}', imports.map((imp) => `${imp};`).join('\n'));
};

const main = async () => {
  const packagePath = await pkgUp();
  if (!packagePath) {
    console.error('No package.json found');
    return;
  }

  let pkg = JSON.parse(await readFile(packagePath, 'utf-8'));

  if (
    !(await confirm(
      `This will set up linting in the "${pkg.name ?? ''}" package. Continue?`,
    ))
  ) {
    return;
  }

  const packageManager = await detect({programmatic: true, cwd: packagePath});

  await ni([
    // Install as devDependencies
    '-D',
    'eslint',
    'prettier',
    // Enables autocomplete in eslint.config.js
    '@types/eslint',
    // Required for linting next - TODO remove once https://github.com/vercel/next.js/issues/64409 is merged
    '@eslint/compat',
    '@atmina/linting',
  ]);

  // Read again after package update
  pkg = JSON.parse(await readFile(packagePath, 'utf-8'));
  const eslintConfigPath = resolve(dirname(packagePath), 'eslint.config.js');
  let hasConfig = false;
  try {
    hasConfig = !!(await readFile(eslintConfigPath, 'utf-8'));
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error(e);
      return;
    }
  }
  if (!hasConfig || (await confirm('Overwrite existing eslint.config.js?'))) {
    const config = createConfig(pkg);
    console.log(eslintConfigPath);
    await writeFile(eslintConfigPath, config, 'utf-8');
    console.info('Created eslint.config.js');
  }

  const prettierIgnorePath = resolve(dirname(packagePath), '.prettierignore');
  let hasPrettierIgnore = false;
  try {
    hasPrettierIgnore = !!(await readFile(prettierIgnorePath, 'utf-8'));
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error(e);
      return;
    }
  }
  if (
    !hasPrettierIgnore ||
    (await confirm('Overwrite existing .prettierignore?'))
  ) {
    const prettierIgnoreSource = resolve(
      dirname(fileURLToPath(import.meta.url)),
      '../.prettierignore',
    );
    await copyFile(prettierIgnoreSource, prettierIgnorePath);
  }

  if (await confirm('Add commands to package.json scripts?')) {
    const scripts = (pkg.scripts ??= {});
    const run = getCommand.bind(null, packageManager, 'run');
    const additionalEslintArgs =
      '--report-unused-disable-directives --max-warnings 0';
    scripts['lint'] = `${run(['lint:fix'])} && ${run(['prettier:fix'])}`;
    scripts['lint:check'] = `eslint . ${additionalEslintArgs}`;
    scripts['lint:fix'] = `eslint . --fix ${additionalEslintArgs}`;
    scripts['prettier:check'] = 'prettier . --check';
    scripts['prettier:fix'] = 'prettier . --write';
  }

  pkg['prettier'] = '@atmina/linting/prettier';

  await writeFile(packagePath, JSON.stringify(pkg, null, 2), 'utf-8');

  console.info('ATMINA Score increased! 📈');
};

void main();
