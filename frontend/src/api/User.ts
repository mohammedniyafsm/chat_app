import axios from "axios"

interface SignupType {
    email : string,
    username: string,
    password : string
}
interface SigninType {
    email : string,
    password : string
}

interface sendMessageType {
    token : string,
    receiverId : string,
    message : string
}


export const SignupUser = async ( data :SignupType)=>{
    const response = await axios.post('http://localhost:3001/user/signup',data)
    return response;
}
export const SigninUser = async ( data :SigninType)=>{
    const response = await axios.post('http://localhost:3001/user/signin',data)
    return response;
}

export const AllUserList = async(token : string,query?:string)=>{
    if(query){
        const response = await axios.get(`http://localhost:3001/user/users?search=${query}`,{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        console.log(response.data);
        
        return response.data
    }
    else{
        const response = await axios.get('http://localhost:3001/user/users',{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        return response.data
    }
}

export const sendMessage= async({ receiverId,message,token }:sendMessageType)=>{
    const response = await axios.post('http://localhost:3001/user/send',{
        receiverId,
        message
    },{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response
}
 
export const getMessage = async( token : string,query:string )=>{
    const response = await axios.get(`http://localhost:3001/user/getmessage?receiverId=${query}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.data;
}

export const getUserDetails = async(token:string)=>{
    const response = await axios.get(`http://localhost:3001/user/mydata`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response.data;
}