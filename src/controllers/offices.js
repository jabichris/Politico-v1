import db from '../models/db';
import Validate from '../helpers/Validate';


class Offices {
  // signup
  static async createOffice(req, res) {
    // Validate inputs
    const checkInputs = [];

    checkInputs.push(Validate.name(req.body.type, true));
    checkInputs.push(Validate.name(req.body.name, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }
    const text = `INSERT INTO
            offices("type", "name")
            VALUES($1, $2)
            returning id, "type", "name"`;
    const values = [
      req.body.type,
      req.body.name,
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
        data: 'office not registered',
      });
    }
  }

  // Get all Offices
  static async allOffices(req, res) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM offices');
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'office not found!',
      });
    }
  }

  // getOne
  static async getOffice(req, res) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM offices WHERE id=$1', [req.params.id]);
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Office not found!',
      });
    }
  }
}
export default Offices;
