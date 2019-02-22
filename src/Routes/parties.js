import express from 'express';
import Parties from '../controllers/parties';
import verifyToken from '../authentication/verifyToken';

const router = express.Router();


router.get('/', verifyToken, Parties.allParties);
router.post('/', verifyToken, Parties.createParty);
router.get('/:id', Parties.getParty);
router.delete('/:id', verifyToken, Parties.deleteParty);


export default router;
