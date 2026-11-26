import * as dotenv from 'dotenv';

dotenv.config();

const currentTz = new Intl.DateTimeFormat().resolvedOptions().timeZone;

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
  pool: {
    // set correct timezone so knex.fn.now() works properly
    afterCreate: (conn, done) => {
      conn.query(`SET timezone = '${currentTz}';`, (err) => {
        done(err, conn);
      });
    },
  },
  migrations: {
    directory: '../db/migrations',
  },
  seeds: {
    directory: '../db/seeds',
  },
};

export default config;
