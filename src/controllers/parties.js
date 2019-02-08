import parties from '../models/parties';

class Parties {
/*check if the Party exists */
static checkParties(partyId) {
let checkParties = {}
for (const key in parties) {
if (parties[key].id === partyId) {
checkParties = parties[key];
break
}
}
return checkParties
}
/* create a party */
static create(req, res) {
const newParty = {
id: Math.ceil(Math.random() * 50),
name: req.body.name,
hqAddress: req.body.hqAddress
};
parties.push(newParty);

const isCreated = Parties.checkParties(newParty.id);

if (Object.keys(isCreated).length > 0) {
return res.status(201).json({
status: 201,
data: isCreated
});
}
return res.status(400).json({
status: 400,
error: 'party not created'
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
/*get a particular party*/
static getOne(req, res) {
    let party = {};
    for (let key in parties) {
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
static deleteParty(req, res){
  const partiesNumber = parties.length;
  let newPartiesNumber = parties.length;
  for (let i in parties){
    if (parties[i].id === parseInt(req.params.id)){
      parties.splice(i, 1);
      newPartiesNumber -= 1;
      break;
    } 
  }
  if (newPartiesNumber < partiesNumber){
    return res.status(200).json({
      status:200,
      data: 'Party was Deleted ',
    });
  }
  return res.status(400).json({
    status:400,
    error: 'Party was not deleted',
  });
}
/*  edit a particular political party */
static editParty(req, res) {
  const partyId = parseInt(req.params.id);
  // let updatedParty = "";
for ( let i=0; i < parties.length;i++){
    if (parties[i].id == partyId) {
      if (req.body.name)
      parties[i].name = req.body.name;
      if(req.body.hqAddress)
      parties[i].hqAddress=req.body.hqAddress;
        res.status(200).send({
          status: 200,
          data: parties[i]
        });
        updatedParty = "done"
      } 
      }
      if (updatedParty != "done"){
        res.status(404).send({
          status: 404,
          error: 'Party not updated',
        });
      }
    }
  
}

export default Parties;