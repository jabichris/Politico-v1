import express from 'express';
import petition from '../controllers/petitions';

const router = express.Router();

router.post('/', petition.create);

export default router;
