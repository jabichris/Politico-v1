/* eslint-disable no-console */
import db from '../models/db';


class Petitions {
  static async create(req, res) {
    const text = `INSERT INTO
      petitions("createdBy", office, body) 
      VALUES((SELECT id FROM users where id = ${req.body.createdBy}), (SELECT id FROM offices WHERE id = ${req.body.office} ), $1)`;

    const values = [
      req.body.body,
    ];

    try {
      const checkPetition = await db.query(text, values);
      const {
        rows,
      } = await db.query(text, values);

      if (checkPetition.rows.length > 0) {
        return res.status(201).json({
          status: 201,
          data: rows,
        });
      } console.log(rows);
      return res.status(400).json({
        status: 400,
        error: 'petition not posted!',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: 400,
        error: 'petition not created!',
      });
    }
  }
}
export default Petitions;
