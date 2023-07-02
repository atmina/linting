import { dirname, resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { pkgUp } from "pkg-up";
import { parseNi, run as runNi } from "@antfu/ni";
// ni uses this so we do too
import prompts from "@posva/prompts";

const TEMPLATE_HEADER = '/* eslint-disable */';

const TEMPLATE_CJS = `${TEMPLATE_HEADER}

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
{{configs}}
];
`;

const TEMPLATE_ESM = `${TEMPLATE_HEADER}

{{imports}}

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
{{configs}}
];
 
export default config;
`;



const ni = (args) => {
  return runNi(parseNi, args);
}

const confirm = async (message) => {
  return (await prompts({type: 'confirm', name: 'confirm', message: message, initial: true })).confirm;
}

const createConfig = (pkg) => {
  const isEsm = pkg.type === 'module';
  console.log('Format (based on package.json -> type):', isEsm ? 'ES Module' : 'CommonJS');
  const dependencies = pkg.dependencies ?? {};
  const template = isEsm ? TEMPLATE_ESM : TEMPLATE_CJS;
  const configs = isEsm
    ? ['...recommended']
    : [`...require('@atmina/linting/eslint/recommended')`];
  const imports = isEsm
    ? [`import recommended from '@atmina/linting/eslint/recommended.js'`]
    : [];

  if (dependencies['tailwindcss']) {
    console.log('+ Tailwind CSS')
    if (isEsm) {
      imports.push(`import tailwind from '@atmina/linting/eslint/tailwind.js'`)
      configs.push('tailwind');
    } else {
      configs.push(`require('@atmina/linting/eslint/tailwind')`);
    }
  }

  if (dependencies['react'] || dependencies['next']) {
    console.log('+ React')
    if (isEsm) {
      imports.push(`import react from '@atmina/linting/eslint/react.js'`)
      configs.push('react');
    } else {
      configs.push(`require('@atmina/linting/eslint/react')`);
    }
  }

  if (dependencies['next']) {
    console.log('+ Next.js')
    if (isEsm) {
      imports.push(`import next from '@atmina/linting/eslint/next.js'`);
      imports.push(`import nextPlugin from '@next/eslint-plugin-next'`);
      configs.push('next(nextPlugin)')
    } else {
      configs.push(`require('@atmina/linting/eslint/next')(require('@next/eslint-plugin-next'))`);
    }
  }

  return template
    .replace('{{configs}}', configs.map(config => `  ${config},`).join('\n'))
    .replace('{{imports}}', imports.map(imp => `${imp};`).join('\n'));
}

const main = async () => {
  const packagePath = await pkgUp();
  if (!packagePath) {
    console.error('No package.json found');
    return;
  }
  let pkg = JSON.parse(await readFile(packagePath, 'utf-8'));
  if (!await confirm(`This will set up linting in the "${pkg.name ?? ''}" package. Continue?`)) {
    return;
  }
  await ni([
    // Install as devDependencies
    '-D',
    'eslint',
    'prettier',
    // Enables autocomplete in eslint.config.js
    '@types/eslint',
    '@atmina/linting'
  ]);
  // Read again after package update
  pkg = JSON.parse(await readFile(packagePath, 'utf-8'));
  const configPath = resolve(dirname(packagePath), 'eslint.config.js');
  let hasConfig = false;
  try {
    hasConfig = !!(await readFile(configPath, 'utf-8'));
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error(e);
      return;
    }
  }
  if (!hasConfig || await confirm('Overwrite existing eslint.config.js?')) {
    const config = createConfig(pkg);
    await writeFile(configPath, config, 'utf-8');
    console.log('Created eslint.config.js')
  }

  pkg['prettier'] = '@atmina/linting/prettier';
  await writeFile(packagePath, JSON.stringify(pkg, null, 2), 'utf-8');
  console.log('Configured Prettier')
  console.log('ATMINA Score increased! 📈');
}

void main();
