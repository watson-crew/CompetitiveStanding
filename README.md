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

Docker is necessary to locally connect to the sql instance, install [here](https://docs.docker.com/get-docker/)

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org) app
- `ui`: a stub React component library shared by `web` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

#### Server

A typescript project containing an azure function for each endpoint in our schema

##### Database

Prisma is used as an ORM to connect to our SQL databases. Our database schema can be seen in the below ERD:

<img src="./apps/server/ERD.svg" width="500" height="500" />

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

#### Setting up local database

To spin up a local SQL server using docker run:
`docker-compose up --build -d`

Then export the DB url as an environment variable:
`export DATABASE_URL='sqlserver://[::1]:1433;database=CompetitiveStanding;user=SA;password=Password1234!;encrypt=true;trustServerCertificate=true'`

You will then need to run the DB migrations:
`npx prisma migrate dev`

Followed by seeding the database:
`npx prisma database seed`

Your local database is now setup.

#### Running the full app

To develop all apps and packages, run the following command:

```
npm run dev
```

Installing packages for a specific workspace

```
npm install <package> -w=<workspace>
```
