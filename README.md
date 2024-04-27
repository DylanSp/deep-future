# Customized React + TypeScript + Vite Template

This repository demonstrates some customizations to Vite's React + Typescript template, improving the ESLint configuration and adding Prettier for formatting.

## How To Use

This repo can be used in two ways:

1. As a template, either [creating a new repo from this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) on GitHub, or just copying it. After doing so, update the versions of all dependencies; [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates) is useful for this.
2. Creating a new project with `npm create vite <project name> -- --template react-ts`, then manually applying the customizations from this repository.

## Changes Made

All changes can be seen in [this GitHub diff view](https://github.com/DylanSp/vite-react-ts-customized/compare/eca5a44767b3ac190ba551d64ec97cd3a6ddb61c...d81cf0a6afbc5770219ebefa8c7c4fd5367465a6).

- ESLint is configured more strictly with type-aware linting (in `.eslintrc.cjs`), following the suggestions in the Vite template's README - see commit [`a86d4dd`](https://github.com/DylanSp/vite-react-ts-customized/commit/a86d4dd09bb76aae912262c24bc8719b72824108).
  - ESLint's `parserOptions` are added.
  - `plugin:@typescript-eslint/recommended` is replaced with `plugin:@typescript-eslint/recommended-type-checked`.
  - [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) is installed, adding `plugin:react/recommended` and `plugin:react/jsx-runtime`.
- ESLint is configured to automatically detect the current React version - see commit [`c082caa`](https://github.com/DylanSp/vite-react-ts-customized/commit/c082caa8241d40a86718c1ff66b4925e77f7f476).
- Prettier is added and configured for code formatting - see commit [`897f0ad`](https://github.com/DylanSp/vite-react-ts-customized/commit/897f0ad7afcbfc2345296c0be2c31b51f0830969). Prettier has also been run on all files in this repo. This repo doesn't include any settings to run Prettier automatically on saving a file - set that up in your editor of choice.
  - `prettier`, `eslint-config-prettier`, and `eslint-plugin-prettier` are added as `devDependencies` in `package.json`.
  - `"plugin:prettier/recommended"` is added to the end of the `extends` array in `eslintrc.cjs`.
  - `"prettier/prettier": "warn"` is added as an ESLint rule in `eslintrc.cjs`.
  - `.prettierc.cjs` is added with Prettier settings, though this isn't necessary; trailing commas and an increased line length are just my personal preferences.
- The `dev` and `preview` scripts in `package.json` have the `--host` option added, which enables them to work in GitHub Codespaces - see commit [`d81cf0a`](https://github.com/DylanSp/vite-react-ts-customized/commit/d81cf0a6afbc5770219ebefa8c7c4fd5367465a6). I found this solution from https://github.com/vitejs/vite/discussions/12561.
