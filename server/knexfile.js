import * as dotenv from 'dotenv';

dotenv.config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: '../db/migrations',
  },
  seeds: {
    directory: '../db/seeds',
  },
};

export default config;