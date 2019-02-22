import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') ? `_${process.env.NODE_ENV}` : '';

const pool = new pg.Pool({
  connectionString: process.env[`DATABASE_URL${env}`],
});

pool.on('connect', () => {
  console.log('connected to the Database!');
});

const drop = () => {
  const usersTable = 'DROP TABLE IF EXISTS users CASCADE';
  const partiesTable = 'DROP TABLE IF EXISTS parties CASCADE';
  const officesTable = 'DROP TABLE IF EXISTS offices CASCADE';
  const candidateTable = 'DROP TABLE IF EXISTS candidates';
  const votes = 'DROP TABLE IF EXISTS vote';
  const petitions = 'DROP TABLE IF EXISTS petition';

  const dropQueries = `${usersTable};${partiesTable}; ${officesTable}; ${candidateTable}; ${votes}; ${petitions}; `;

  pool.query(dropQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('user removed');
    process.exit(0);
  });
};

const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(50) NOT NULL,
        "lastName" VARCHAR(50) NOT NULL,
        "otherName" VARCHAR(50) ,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        username VARCHAR(50) NOT NULL,
        "photoUrl" TEXT NOT NULL,
        password TEXT NOT NULL,
        "registered" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "isAdmin" BOOLEAN DEFAULT FALSE
      )`;

  const partiesTable = `CREATE TABLE IF NOT EXISTS
      parties(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        "hqAddress" TEXT NOT NULL,
        "logoUrl" TEXT   NULL
      )`;

  const officesTable = `CREATE TABLE IF NOT EXISTS
      offices(
        id SERIAL PRIMARY KEY,
        type VARCHAR(100) NOT NULL,
        name TEXT NOT NULL
      )`;

  const candidateTable = `CREATE TABLE IF NOT EXISTS
      candidates(
        id SERIAL PRIMARY KEY,
        "officeId" INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
        "partyId" INT NOT NULL REFERENCES parties(id) ON DELETE CASCADE ON UPDATE CASCADE,
        "candidateId"INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`;
  const petitions = `CREATE TABLE IF NOT EXISTS
      petitions(
         id SERIAL PRIMARY KEY,
         "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
         "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
         office INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
         body TEXT NOT NULL
      )`;
  const votes = `CREATE TABLE IF NOT EXISTS
      votes(
         id SERIAL PRIMARY KEY,
         "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
         "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
         office INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
         candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`;

  const createQueries = `${usersTable}; ${partiesTable}; ${officesTable}; ${candidateTable}; ${petitions}; ${votes}`;

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