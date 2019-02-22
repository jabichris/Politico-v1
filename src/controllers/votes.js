import db from '../models/db';

class Vote {
  static async vote(req, res) {
    const text = 'INSERT INTO votes ("createdBy", office, candidate) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [
      req.body.userId,
      req.body.office,
      req.body.candidate,
    ];
    try {
      const {
        rows,
      } = await db.query(text, values);
      return res.status(200).json({
        status: 200,
        data: rows,
        message: 'successful',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'fail',
      });
    }
  }
}


export default Vote;
