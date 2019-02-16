/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
import parties from '../models/parties';
// eslint-disable-next-line import/no-unresolved
// import validateParty from '../helpers/validate';

class Parties {
  /* check if the Party exists */

  static checkParties(partyId) {
    let checkParties = {};
    for (const key in parties) {
      if (parties[key].id === partyId) {
        checkParties = parties[key];
        break;
      }
    }
    return checkParties;
  }

  /* create a party */
  static create(req, res) {
    const newParty = {
      id: Math.ceil(Math.random() * 50),
      name: req.body.name,
      hqAddress: req.body.hqAddress,
    };
    if (req.body.name === '') {
      return res.status(400).send({
        status: 400,
        error: 'Name should not be empty',
      });
    }
    parties.push(newParty);

    const isCreated = Parties.checkParties(newParty.id);

    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        data: isCreated,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'party not created',
    });
  }

  /* get all parties */
  static getAll(req, res) {
    if (Object.keys(parties).length > 0) {
      return res.status(200).json({
        status: 200,
        data: parties,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'parties not found!',
    });
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

  /*  edit a particular political party */
  static editParty(req, res) {
    const partyId = parseInt(req.params.id);
    for (let i = 0; i < parties.length; i += 1) {
      if (parties[i].id === partyId) {
        if (req.body.name) { parties[i].name = req.body.name; }
        if (req.body.hqAddress) { parties[i].hqAddress = req.body.hqAddress; }
        res.status(200).send({
          status: 200,
          data: parties[i],
        });
      }
    }
    const updatedParty = 'done';
    if (updatedParty !== 'done') {
      res.status(404).send({
        status: 404,
        error: 'Party not updated',
      });
    }
  }
}

export default Parties;
