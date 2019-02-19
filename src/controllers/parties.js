/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
import db from '../models/db';
import parties from '../models/parties';


/* check if the Party exists */
class Parties {
  /* get all parties */
  static async getAll(req, res) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM parties');
      if (rows.length > 0) {
        // eslint-disable-next-line no-shadow
        const parties = [];
        rows.forEach((party) => {
          party.push(parties);
        });
        // eslint-disable-next-line no-console
        console.log('Db', parties);
        return res.status(200).json({
          status: 200,
          data: parties,
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

  /* get a particular party */
  static getOne(req, res) {
    let party = {};
    for (const key in parties) {
      if (parties[key].id === parseInt(req.params.id)) {
        party = parties[key];
        break;
      }
    }
    if (Object.keys(party).length > 0) {
      return res.status(200).json({
        status: 200,
        data: party,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Party not found!',
    });
  }

  /*  delete a particular political party */
  static deleteParty(req, res) {
    const partiesNumber = parties.length;
    let newPartiesNumber = parties.length;
    for (const i in parties) {
      if (parties[i].id === parseInt(req.params.id)) {
        parties.splice(i, 1);
        newPartiesNumber -= 1;
        break;
      }
    }
    if (newPartiesNumber < partiesNumber) {
      return res.status(200).json({
        status: 200,
        data: 'Party was Deleted ',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Party was not deleted',
    });
  }
}
export default Parties;
