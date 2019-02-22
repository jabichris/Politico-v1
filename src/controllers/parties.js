/* eslint-disable consistent-return */
import db from '../models/db';
import Validate from '../helpers/Validate';


class Parties {
  // newParty
  static async createParty(req, res) {
    const checkInputs = [];

    checkInputs.push(Validate.name(req.body.name, true));
    checkInputs.push(Validate.name(req.body.hqAddress, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }
    const text = `INSERT INTO
            parties("name", "hqAddress", "logoUrl")
            VALUES($1, $2, $3)
            returning id, "name", "hqAddress", "logoUrl"`;
    const values = [
      req.body.name,
      req.body.hqAddress,
      req.body.logoUrl,
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
        error: 'party not registered',
      });
    }
  }

  // Get all Parties
  static async allParties(req, res) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM parties');
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'party not found!',
      });
    }
  }

  // getOne
  static async getParty(req, res) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM parties WHERE id=$1', [req.params.id]);
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Party not found!',
      });
    }
  }

  /* delete a meetup */
  static async deleteParty(req, res) {
    try {
      const {
        rows,
      } = await db.query('DELETE FROM parties WHERE id=$1 RETURNING *', [req.params.id]);

      if (rows.length > 0) {
        return res.json({
          status: 200,
          message: 'party deleted',
        });
      }

      return res.json({
        status: 200,
        message: 'party not found',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Unexisting party',
      });
    }
  }
}
export default Parties;
