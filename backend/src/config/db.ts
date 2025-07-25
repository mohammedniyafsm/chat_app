import mongoose from "mongoose";
require('dotenv').config();

export const ConnectDB = async()=>{
    const mongourl = process.env.MONGO_DB_URL as string;
    try {
        if(!mongourl){
            console.log("mongoUrl not Provided");
        }
        const response = await mongoose.connect(mongourl);
        console.log("Connected To Database");
        return;
    } catch (error) {
        console.log("Error While connecting Database");
    }
}    