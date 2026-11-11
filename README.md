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
