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

// https://www.codementor.io/olawalealadeusi896
export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // eslint-disable-next-line eol-last
};