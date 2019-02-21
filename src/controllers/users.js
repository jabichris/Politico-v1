/* eslint-disable consistent-return */
import dotenv from 'dotenv';

// eslint-disable-next-line import/no-unresolved
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-unresolved
import jwt from 'jsonwebtoken';
import db from '../models/db';
// eslint-disable-next-line import/no-unresolved

import Validate from '../helpers/Validate';


dotenv.config();

class User {
  /* signup */
  static async createAccount(req, res) {
    // Validate inputs
    const checkInputs = [];

    checkInputs.push(Validate.name(req.body.firstName, true));
    checkInputs.push(Validate.name(req.body.lastName, true));
    checkInputs.push(Validate.email(req.body.email, true));
    checkInputs.push(Validate.name(req.body.username, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }

    const text = `INSERT INTO
            users("firstName", "lastName", "otherName",  email, phone, username, password, "photoUrl", "isAdmin")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            returning id, "firstName", "lastName", "otherName", email, phone, username, "isAdmin"`;


    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.otherName,
      req.body.email,
      req.body.phone,
      req.body.username,
      bcrypt.hashSync(req.body.password, 8),
      req.body.photoUrl,
      req.body.isAdmin,
    ];
    let checkUser = '';
    try {
      checkUser = await db.query('SELECT * FROM users WHERE username=$1 OR email=$2', [req.body.username, req.body.email]);

      if (checkUser.rows.length > 0) {
        return res.status(400).json({
          status: 400,
          error: 'Sorry, this account already exists',
        });
      }

      const {
        rows,
      } = await db.query(text, values);
      if (rows.length > 0) {
        rows[0].registered = new Date(rows[0].registered).toDateString();
        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Not Resistered',
      });
    }
  }
  /* login */

  // eslint-disable-next-line consistent-return
  static async signIn(req, res) {
    let checkInput = false;
    checkInput = Validate.email(req.body.email, true);
    if (checkInput.isValid === false) {
      return res.status(400).json({
        status: 400,
        error: checkInput.error,
      });
    }
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM users WHERE email=$1', [req.body.email]);
      if (rows.length > 0) {
        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
          const kindUser = rows[0].isAdmin ? 'admin' : 'normal';
          const token = jwt.sign({
            userId: rows[0].id,
            kindUser,
          }, process.env.SECRET_KEY, {
            expiresIn: 14400,
          });
          return res.status(200).json({
            status: 200,
            data: {
              id: rows[0].firstName,
              lastName: rows[0].lastName,
              email: rows[0].email,
              username: rows[0].username,
              isAdmin: rows[0].isAdmin,
            },
            token,
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Try again,Username and Password are not matching',
      });

    }
  }
}
export default User;
