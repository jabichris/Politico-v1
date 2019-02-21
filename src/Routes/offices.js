import express from 'express';
import Offices from '../controllers/offices';

const router = express.Router();

router.post('/', Offices.createOffice);
router.get('/', Offices.allOffices);
router.get('/:id', Offices.getOffice);
// router.delete('/:id', Offices.deleteOffice);

export default router;
