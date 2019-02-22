import express from 'express';
import Offices from '../controllers/offices';
import verifyToken from '../authentication/verifyToken';

const router = express.Router();

router.post('/', verifyToken, Offices.createOffice);
router.get('/', verifyToken, Offices.allOffices);
router.get('/:id', Offices.getOffice);
// router.delete('/:id', Offices.deleteOffice);

export default router;
