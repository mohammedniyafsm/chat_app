import User from "../model/User";
import Message from "../model/message";
import { Request,Response } from "express";

export const SendMessage =async(req:Request,res:Response) :Promise<void> =>{
    const { receiverId ,message } = req.body;
     const senderId = req.user as string;
    try {
       if( !receiverId || !message ){
        res.status(400).json({message:"Receiver ID or message not found"});
        return;
       } 
       const user = await User.findOne({_id : req.user });
       if(!user){
        res.status(400).json({message:"User not found"});
        return;
       }
       const recieve = await User.findOne({_id : receiverId });
       if(!recieve){
        res.status(400).json({message:"Receiver ID not found"});
        return;
       }
       const response = new Message({
        userId : req.user,
        receiverId,
        message
       })
       await response.save();
       res.status(200).json({message : "Message Send Succesfully"})
       return;
    } catch (error) {
        res.status(500).json({message:"Server error",error})
    }
}


export const getMessage = async (req: Request, res: Response): Promise<void> => {
  const receiverId = req.query.receiverId as string;

  try {
    if (!receiverId) {
      res.status(400).json({ message: "receiverId is required in query" });
      return;
    }

    const messages = await Message.find({
      $or: [
        { userId: req.user, receiverId },
        { userId: receiverId, receiverId: req.user }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch message error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
