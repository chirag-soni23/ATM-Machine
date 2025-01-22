import { Atm } from "../models/atmModel.js";
import { User } from "../models/userModel.js";
import { TryCatch } from "../utils/TryCatch.js";

// deposit money
export const depositMoney = TryCatch(async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater then zero." })
    }

    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }

    user.balance += amount;
    await user.save();
    await Atm.create({
        userId: user._id,
        type: 'deposit',
        amount,
        status: 'success'
    })

    res.json({
        balance: user.balance,
        message: "Deposit successfully!"
    })
})

// check balance
export const checkBalance = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    await Atm.create({
        userId:user._id,
        type:'check_balance',
        status:'success'
    })

    res.json({
        balance:user.balance,
        message:"Balance retrived successfully."
    })
})

// withdraw money
export const withdrawBalance = TryCatch(async(req,res)=>{
    const { amount } = req.body;
    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater then zero." })
    }

    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }

    if(user.balance < amount){
        return res.status(404).json({message:"Insufficient funds."})
    }

    user.balance -= amount
    await user.save()

    await Atm.create({
        userId: user._id,
        type: 'withdraw',
        amount,
        status: 'success'
    })

    res.json({
        balance: user.balance,
        message: "Withdraw successfully!"
    })
})

// transaction history
export const transactionHistory = TryCatch(async (req, res) => {
    // Fetch transactions of the current user
    const transactions = await Atm.find({
      userId: req.user._id,
      type: { $in: ['withdraw', 'deposit', 'transfer'] },
    }).sort({ timestamp: -1 });
  
    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found." });
    }
  
    // Fetch user details for source and target users
    const transactionsWithUserData = await Promise.all(transactions.map(async (transaction) => {
      const sourceUser = await User.findById(transaction.userId).select('name mobileNumber');
      
      let targetUser = null;
      if (transaction.type === 'transfer' && transaction.targetUserId) {
        targetUser = await User.findById(transaction.targetUserId).select('name mobileNumber');
      }
  
      return {
        ...transaction.toObject(),
        userName: sourceUser.name,
        userMobile: sourceUser.mobileNumber,
        targetUserName: targetUser ? targetUser.name : null,
        targetUserMobile: targetUser ? targetUser.mobileNumber : null,
      };
    }));
  
    res.json({
      transactions: transactionsWithUserData,
      message: "Transaction fetched successfully"
    });
});
  
// transfer money
export const transferMoney = TryCatch(async (req, res) => {
    const { targetMobileNumber, amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than zero." });
    }

    const sourceUser = await User.findById(req.user._id);
    if (!sourceUser) {
        return res.status(404).json({ message: "Source user not found." });
    }

    if (sourceUser.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds." });
    }

    const targetUser = await User.findOne({ mobileNumber: targetMobileNumber });
    if (!targetUser) {
        return res.status(404).json({ message: "Target user not found." });
    }

    
    if (sourceUser._id.toString() === targetUser._id.toString()) {
        return res.status(400).json({ message: "You cannot transfer money to yourself." });
    }

    sourceUser.balance -= amount;
    targetUser.balance += amount;

    await sourceUser.save();
    await targetUser.save();

    await Atm.create({
        userId: sourceUser._id,
        targetUserId: targetUser._id,
        type: 'transfer',
        amount,
        status: 'success'
    });

    res.json({
        message: `Transfer successful to ${targetUser.name}`,
        sourceBalance: sourceUser.balance,
        targetUser: {
            id: targetUser._id,
            name: targetUser.name,
            mobileNumber: targetUser.mobileNumber, 
        },
    });
});

// delete Transaction history
export const deleteTransactionHistory = TryCatch(async (req, res) => {
    const { transactionId, deleteAll } = req.body; 

    if (deleteAll) {
        await Atm.deleteMany({ userId: req.user._id });
        res.json({ message: "All transactions deleted successfully." });
    } else if (transactionId) {
        const transaction = await Atm.findByIdAndDelete(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found." });
        }
        res.json({ message: "Transaction deleted successfully." });
    } else {
        return res.status(400).json({ message: "Either transactionId or deleteAll flag is required." });
    }
});