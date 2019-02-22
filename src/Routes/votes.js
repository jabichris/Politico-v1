import express from 'express';
import Vote from '../controllers/votes';

const router = express.Router();

router.post('/', Vote.vote);


export default router;
