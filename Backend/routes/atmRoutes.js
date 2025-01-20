import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { checkBalance, deleteTransactionHistory, depositMoney, transactionHistory, transferMoney, withdrawBalance } from '../controllers/atmController.js';

const router = express.Router();

router.post('/deposit',isAuth,depositMoney);
router.get('/check-balance',isAuth,checkBalance);
router.post('/withdraw',isAuth,withdrawBalance);
router.get('/get-trans',isAuth,transactionHistory);
router.post('/transfer',isAuth,transferMoney)
router.post('/delete_transaction_history',isAuth,deleteTransactionHistory)


export default router;