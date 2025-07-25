import { json, Request,Response } from "express"
import User from "../model/User";
import { generateToken } from "../utils/jwt";

export const Signup = async (req:Request,res:Response)=>{
    const { username,email,password } = req.body;
    try {        
        const emailExist = await User.findOne({email});
        if(emailExist){
            res.status(400).json({message : "Email Already Exist"})
            return
        }
        const response = new User({
            username,
            email,
            password
        })
        await response.save();
        res.status(200).json({message : "Account Created"});
        return;
    } catch (error) {
        res.status(500).json({message: "Server Error",error})
    }
}

export const Signin = async (req:Request,res:Response) :Promise<void> =>{
    const { email, password } = req.body;
    try {
        const emailExist = await User.findOne({email});
        if(!emailExist){
            res.status(400).json({message : "Email not Found"})
            return;
        }
        const response = await emailExist.comparePassword(password);
        if(!response){
            res.status(403).json({message : "Invalid Credentials"})
            return;
        }
        const token = await  generateToken(emailExist._id.toString())        
        res.status(200).json({message:"Successfully signed in",token})
        return;
    } catch (error) {
        res.status(500).json({message : "sever error ",error})
    }
}

export const AllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search as string;
    const currentUserId = req.user;

    let users;

    if (search && search.trim() !== "") {
      users = await User.find({
        _id: { $ne: currentUserId }, 
        username: { $regex: search, $options: "i" },
      }).select("-password");
    } else {
      users = await User.find({
        _id: { $ne: currentUserId }, 
      }).select("-password");
    }

    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const Mydata = async(req:Request,res:Response):Promise<void>=>{
  try {
    const userId = req.user;
    const response = await User.find({_id : userId }).select('-password');
    res.status(200).json(response);
    return;
  } catch (error) {
     res.status(500).json({ message: "Server error", error });
  }
}