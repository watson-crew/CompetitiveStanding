# Competitive Standing 🥇

MVP: Digitalising 1 vs. 1 matches in a office/casual setting, contribute by following [this board](https://github.com/users/piercemorris/projects/1/views/1)

## Getting up and running 🏃💨

Ensure you have:

- Node V. 14 >
- npm V. 7 >
- Docker
- Turborepo (installed globally)

The project is a monorepo based off [turborepo](https://turborepo.org/) which accomodates for multiple apps to coexist in a single repository.
```
npm install turbo -D
```

Docker is necessary to locally connect to the postgres instance, install [here](https://docs.docker.com/get-docker/)

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org) app
- `ui`: a stub React component library shared by `web` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages for production, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

PG Admin is [hosted locally](http://localhost:8081/) as a DB GUI

Installing packages for a specific workspace

```
npm install <package> -w=<workspace>
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
