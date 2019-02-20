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
  // eslint-disable-next-line consistent-return
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
            users("firstName", "lastName",  email, username, password, "isAdmin")
            VALUES($1, $2, $3, $4, $5, $6)
            returning id, "firstName", "lastName", email, username,  "isAdmin"`;


    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.username,
      bcrypt.hashSync(req.body.password, 8),
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
        for (let i = 0; i < rows.length; i += 1) {
          if (bcrypt.compareSync(req.body.password, rows[i].password)) {
            const kindUser = rows[i].isAdmin ? 'admin' : 'normal';
            const token = jwt.sign({
              userId: rows[i].id,
              kindUser,
            }, process.env.SECRET_KEY, {
              expiresIn: 14400,
            });
            return res.status(200).json({
              status: 200,
              data: {
                id: rows[i].firstName,
                lastName: rows[i].lastName,
                email: rows[i].email,
                username: rows[i].username,
                isAdmin: rows[i].isAdmin,
              },
              token,
            });
          }
        }
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Try again,Username or Password is incorrect',
      });
    }
  }
}
export default User;
