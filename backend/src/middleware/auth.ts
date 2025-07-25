import { NextFunction, Request,Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";

export const protect = async (req:Request,res:Response,next:NextFunction)=>{
    const AuthMidd = req.headers.authorization;
    if(!AuthMidd || !AuthMidd.startsWith("Bearer ")){
        res.status(401).json({message : "Token not Provided"})
        return;
    }
    const jwt_key = process.env.JWT_SECRET_KEY as string;
    try {
        const token = AuthMidd.split(" ")[1];
        const decoded = jwt.verify(token,jwt_key) as JwtPayload;
        req.user = decoded._id;
        next();
    } catch (error) {
        res.status(500).json({message:"Server error",error})
    }
}