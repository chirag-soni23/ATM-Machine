import mongoose from 'mongoose';

const atmSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    targetUserId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:function(){
            return this.type == 'transfer'
        }        
    },
    type:{
        type:String,
        enum:['withdraw', 'deposit', 'check_balance','transfer'],
        required:true,
    },
    amount:{
        type:Number,
        required:function(){
            return ['withdraw', 'deposit', 'transfer'].includes(this.type);
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
