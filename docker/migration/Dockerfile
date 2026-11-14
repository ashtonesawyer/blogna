FROM node:24-alpine AS base
WORKDIR /app

RUN chown node:node /app
COPY --chown=node:node ./db  ./db
COPY --chown=node:node server/knexfile.js server/knexfile.js
RUN npm install knex pg dotenv --save

FROM base AS dev
USER node