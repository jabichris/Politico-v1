import db from '../models/db';

class Parties {
  // eslint-disable-next-line consistent-return
  static async allParties(req, res) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM parties');
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'parties not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export default Parties;
