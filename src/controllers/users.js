/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/db';
import Validate from '../helpers/Validate';


dotenv.config();

class User {
  /* signup */
  static async createAccount(req, res) {
    const text = `INSERT INTO

            users("firstName", "lastName", "otherName",  email, phone, username, "photoUrl", password)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning id, "firstName", "lastName", "otherName", email, phone, username, "photoUrl" `;


    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.otherName,
      req.body.email,
      req.body.phone,
      req.body.username,
      req.body.photoUrl,
      bcrypt.hashSync(req.body.password, 8),

    ];

    try {

      const {
        rows,
      } = await db.query(text, values);
      if (rows.length > 0) {
        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,

        message: 'Verify your inputs',

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
            const kindUser = rows[i].isAdmin ? 'admin' : 'user';
            const token = jwt.sign({
              userId: rows[i].id,
              kindUser,
            }, process.env.SECRET_KEY, {
              expiresIn: 14400,
            });
            return res.status(200).json({
              status: 200,
              data: [{
                token,
                user: {
                  id: rows[i].firstName,
                  lastName: rows[i].lastName,
                  email: rows[i].email,
                  username: rows[i].username,
                  isAdmin: rows[i].isAdmin,
                },
              }],

            });
          }

        }
      } return res.status(400).json({
        status: 400,
        error: 'Try again,Username and Password are not matching',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Try again,Username and Password are not matching',
      });
    }
  }
}
export default User;
