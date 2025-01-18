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
export const transactionHistory = TryCatch(async(req,res)=>{
    const tranactions = await Atm.find({userId:req.user._id,type:{$in:['withdraw','deposit','transfer']}}).sort({timestamp:-1});

    if(!tranactions.length){
        return res.status(404).json({message:"No transactions found."})
    }

    res.json({
        tranactions,
        message:"Transaction fetched successfully"
    })
})

// transfer money
export const transferMoney = TryCatch(async(req,res)=>{
    const { targetUserId, amount } = req.body;

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

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
        return res.status(404).json({ message: "Target user not found." });
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
        message: "Transfer successful!",
        sourceBalance: sourceUser.balance,
        targetUser: {
            id: targetUser._id,
            name: targetUser.name,
        },
    });

})