import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') ? `_${process.env.NODE_ENV}` : '';

const pool = new pg.Pool({
  connectionString: process.env[`DATABASE_URL${env}`],
});

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the Database');
});

const drop = () => {
  const usersTable = 'DROP TABLE IF EXISTS users CASCADE';
  const partiesTable = 'DROP TABLE IF EXISTS parties CASCADE';
  const officesTable = 'DROP TABLE IF EXISTS offices CASCADE';
  const candidateTable = 'DROP TABLE IF EXISTS candidates';

  const dropQueries = `${partiesTable}; ${officesTable}; ${candidateTable}; ${usersTable};`;

  pool.query(dropQueries)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    // eslint-disable-next-line no-console
    console.log('client removed');
    process.exit(0);
  });
};

const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(50) NOT NULL,
        "lastName" VARCHAR(50) NOT NULL,
        "otherName" VARCHAR(50) NOT NULL,
        email VARCHAR(100) NULL,
        phone VARCHAR(15) NOT NULL,
        username VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        "logoUrl" TEXT NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      )`;

  const partiesTable = `CREATE TABLE IF NOT EXISTS
      parties(
        id SERIAL PRIMARY KEY,
        "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        name VARCHAR(100) NOT NULL,
        "hqAddress" TEXT NOT NULL,
        "logoUrl" TEXT []  NULL,
        tags TEXT [] NULL
      )`;

  const officesTable = `CREATE TABLE IF NOT EXISTS
      offices(
        id SERIAL PRIMARY KEY,
        type VARCHAR(100) NOT NULL,
        name TEXT NOT NULL
      )`;

  const createQueries = `${usersTable}; ${partiesTable}; ${officesTable}; `;

  pool.query(createQueries)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    // eslint-disable-next-line no-console
    console.log('client removed');
    process.exit(0);
  });
};

export {
  drop,
  create,
  pool,
};

// eslint-disable-next-line eol-last
require('make-runnable');