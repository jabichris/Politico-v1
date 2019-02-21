import express from 'express';
import Parties from '../controllers/parties';

const router = express.Router();

router.get('/', Parties.allParties);
router.post('/', Parties.createParty);
router.get('/:id', Parties.getParty);
router.delete('/:id', Parties.deleteParty);


export default router;
