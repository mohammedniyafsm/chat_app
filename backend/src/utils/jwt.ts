import jwt from "jsonwebtoken";
require('dotenv').config();


export const generateToken = async (_id : string):Promise<string>=>{
    try {
        const jwt_key = process.env.JWT_SECRET_KEY as string ;
        if(!jwt_key){
            console.log("payload Not Provided");
        }
        const payload = {_id}
        const token = jwt.sign(payload,jwt_key,{ expiresIn: '30d' });
        return token;  
    } catch (error) {
        console.error("Error While Generating JWT Token", error);
        throw error;
    }
}