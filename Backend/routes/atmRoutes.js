import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { depositMoney } from '../controllers/atmController.js';

const router = express.Router();

router.post('/deposit',isAuth,depositMoney)


export default router;