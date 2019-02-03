import express from 'express';
import Offices from '../controllers/offices'

const router = express.Router();

router.post('/', Offices.create);
router.get('/', Offices.getAllOffices);
router.get('/:id', Offices.getOffice);

export default router;