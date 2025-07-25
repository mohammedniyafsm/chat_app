import express,{ Router } from "express";
import { AllUser, Mydata, Signin, Signup } from "../controller/userController";
import { protect } from "../middleware/auth";
import { getMessage, SendMessage } from "../controller/messageController";

const router =express.Router();

router.post('/signup',Signup);
router.post('/signin',Signin);
router.get('/users',protect,AllUser); //AllUsers Lists
router.post('/send',protect,SendMessage); //send messages
router.get('/getmessage',protect,getMessage); //get all messages
router.get('/mydata',protect,Mydata); //get user details


export default router;