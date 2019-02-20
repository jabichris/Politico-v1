import express from 'express';
import Parties from '../controllers/parties';

const router = express.Router();

router.get('/', Parties.allParties);


export default router;
