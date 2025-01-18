import mongoose from 'mongoose';

const atmSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    type:{
        type:String,
        enum:['withdraw', 'deposit', 'check_balance'],
        required:true,
    },
    amount:{
        type:Number,
        required:function(){
            return this.type === 'withdraw' || this.type === 'deposit';
        }
    },
    status:{
        type:String,
        enum:['success','failed'],
        default:'success'
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
},{timestamps:true});

export const Atm = mongoose.model('atm', atmSchema);
