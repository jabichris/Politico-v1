
import express from 'express';
// eslint-disable-next-line import/no-unresolved
import User from '../controllers/users';

const router = express.Router();

router.post('/signup', User.createAccount);
router.post('/login', User.signIn);

export default router;
