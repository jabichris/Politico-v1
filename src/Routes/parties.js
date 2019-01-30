import express from 'express';
import Parties from '../controllers/Parties'

const router = express.Router();

router.post('/', Parties.create);

export default router