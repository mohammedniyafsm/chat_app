import mongoose, { model, Model, Schema } from "mongoose";


interface IMessage extends Document{
    _id : mongoose.Types.ObjectId
    userId : mongoose.Types.ObjectId,
    receiverId : mongoose.Types.ObjectId,
    message : string,
    timestamp: Date;
}

export const messageSchema : Schema <IMessage> = new Schema ({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    receiverId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    message : {
        type : String,
        required : true
    },
    timestamp : {
        type: Date,
        default: Date.now,
  },
})

const Message : Model <IMessage> = model <IMessage> ('Message',messageSchema);

export default Message;