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
}
export default Parties