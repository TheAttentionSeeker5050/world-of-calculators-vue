# World of Calculators

A web application made using Vite, Vue.js, Tailwind and Charts.js

## Description

A web application offering a variety of calculators for different needs. Built using Vue.js and Tailwind CSS, the application maintains a clean separation of concerns between calculation methods, page layouts, and components. Features include calculators for mortgage payouts, monthly or bi-weekly rates, car loans, retirement planning, and unit conversions. Also includes graph data representation of calculation results.

## Site Demo
You can access a deployed version of this site at https://world-of-calculators.nicolas-castellano.com/.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
![build](https://github.com/TheAttentionSeeker5050/world-of-calculators-vue/actions/workflows/build.yml/badge.svg)
