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

We are using `Knex.js` to handle migrations.

## Environment Variables

In order to connect to the db, set up a `.env` file. Never commit this file. The example below is set
up with the default credentials for the docker set up:

```
DB_USER=blogna
DB_NAME=blogna_db
DB_HOST=localhost
DB_PASSWORD=passthebologna
```
