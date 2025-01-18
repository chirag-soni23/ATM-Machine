import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { checkBalance, depositMoney, transactionHistory, transferMoney, withdrawBalance } from '../controllers/atmController.js';

const router = express.Router();

router.post('/deposit',isAuth,depositMoney);
router.get('/check-balance',isAuth,checkBalance);
router.post('/withdraw',isAuth,withdrawBalance);
router.get('/get-trans',isAuth,transactionHistory);
router.post('/transfer',isAuth,transferMoney)


export default router;