import mongoose, { model, Model, Schema } from "mongoose";
import bcrypt from "bcrypt-ts"

export interface IUser extends Document {
    _id : mongoose.Types.ObjectId
    username : string,
    email    : string,
    password : string,
    comparePassword (password : string):Promise<boolean>
}




export const UserSchema : Schema <IUser> = new Schema ({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    }
})

UserSchema.pre('save', async function (){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);    
    }
})


 UserSchema.methods.comparePassword = async function (password:string):Promise<boolean>{
    return bcrypt.compare(password,this.password)
}

const User : Model <IUser> = model <IUser> ('User',UserSchema);

export default User;
