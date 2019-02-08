import express from 'express';
import Parties from '../controllers/parties'

const router = express.Router();

router.post('/', Parties.create);
router.get('/', Parties.getAll);
router.get('/:id', Parties.getOne);
router.delete('/:id', Parties.deleteParty);
router.patch('/:id/name', Parties.editParty);

export default router