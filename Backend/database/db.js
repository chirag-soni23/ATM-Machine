import mongoose from "mongoose";
export const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"atm-system"
        });   
        console.log(`Mongodb connected`);     
    } catch (error) {
        console.log(`Error -> ${error}`);
        process.exit(1);      
    }
}