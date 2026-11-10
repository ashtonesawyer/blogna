FROM postgres:18

RUN apt update \
    && apt-get install -y openssl

RUN openssl req -new -x509 -days 365 -nodes \
    -out /var/lib/postgresql/server.crt \
    -keyout /var/lib/postgresql/server.key \
    -subj "/CN=localhost"

# Set strict permissions required by PostgreSQL
RUN chown postgres:postgres /var/lib/postgresql/server.key && \
    chmod 600 /var/lib/postgresql/server.key
