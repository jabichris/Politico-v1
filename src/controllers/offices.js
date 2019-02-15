/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
import offices from '../models/offices';

class Offices {
/* check if the Party exists */
  static checkOffices(officeId) {
    let checkOffices = {};
    for (const key in offices) {
      if (offices[key].id === officeId) {
        checkOffices = offices[key];
        break;
      }
    }
    return checkOffices;
  }

  /* create an office */
  static create(req, res) {
    const newOffice = {
      id: Math.ceil(Math.random() * 100),
      name: req.body.name,
      hqAddress: req.body.hqAddress,
    };
    offices.push(newOffice);
    if (req.body.name === '') {
      return res.status(400).send({
        status: 400,
        error: 'Name should not be empty',
      });
    }
    const isCreated = Offices.checkOffices(newOffice.id);

    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        data: isCreated,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'office not created',
    });
  }

  /* get all Offices */
  static getAllOffices(req, res) {
    if (Object.keys(offices).length > 0) {
      return res.status(200).json({
        status: 200,
        data: offices,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'offices not found!',
    });
  }
  /* get an office by id */

  static getOffice(req, res) {
    let office = {};
    for (const key in offices) {
      if (offices[key].id === parseInt(req.params.id)) {
        office = offices[key];
        break;
      }
    }
    if (Object.keys(office).length > 0) {
      return res.status(200).json({
        status: 200,
        data: office,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Office not found!',
    });
  }
  /*  delete a particular office */

  static deleteOffice(req, res) {
    const officesNumber = offices.length;
    let newOfficesNumber = offices.length;
    for (const i in offices) {
      if (offices[i].id === parseInt(req.params.id)) {
        offices.splice(i, 1);
        newOfficesNumber -= 1;
        break;
      }
    }
    if (newOfficesNumber < officesNumber) {
      return res.status(200).json({
        status: 200,
        data: 'Office was Deleted ',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Office was not deleted',
    });
  }
}

export default Offices;
