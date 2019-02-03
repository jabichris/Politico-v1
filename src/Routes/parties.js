import express from 'express';
import Parties from '../controllers/Parties'

const router = express.Router();

router.post('/', Parties.create);
router.get('/', Parties.getAll);
router.get('/:id', Parties.getOne);


export default router