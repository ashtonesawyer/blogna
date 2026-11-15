# B'logna

## DB

For ease of reuse, we have the database set up running in a docker container. You can start the container with

```
 $ docker compose up -d --build
```

To access the database from the command line, you can use the following command

```
 $ psql -h localhost -U blogna blogna_db
```

To tear down the database, run the following

```
 $ docker compose down
```

## Migrations

We are set up to use Knexjs for database migrations (and seeding). It is currently
configured to run migrations on whatever database is configured in your `.env` file.

The Knex docs are fairly in depth, but can be a little annoying to navigate.
These are the two sections that are likely the most useful.

- [Migration Syntax Docs](https://knexjs.org/guide/schema-builder.html)
- [Migration + Seed CLI Docs](https://knexjs.org/guide/migrations.html)

### Useful Commands

- `npm run migrate:make <name>` to create a template file for your new migration
- `npm run migrate:latest` to run all migrations that have not yet run
- `npm run migrate:rollback` to rollback the latest batch of migrations
- `npm run seed:make <name>` to create a new template seed file
- `npm run seed:run` to run all seed files (can add more arguments to run only select files)

---

## `.env` File

In order to connect to the db, set up a `.env` file. Never commit this file. The example below is set
up with the default credentials for the docker set up:

```
DB_USER=blogna
DB_NAME=blogna_db
DB_HOST=localhost
DB_PASSWORD=passthebologna
```

## JWT Secrets

Generate a secret using the following command:

```
 $ openssl rand -hex 64
```

Add this secret to your `.env` file:

```
JWT_SECRET=<gen'd code>
```

This is the code that will be used to sign the JWTs.
