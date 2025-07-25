import { useMutation, useQuery } from "@tanstack/react-query"
import { AllUserList, getMessage, getUserDetails, sendMessage, SigninUser, SignupUser } from "../api/User"

export const useSignin = ()=>{
    return useMutation ({
        mutationFn : SigninUser
    })
}

export const useSignup = ()=>{
    return useMutation({
        mutationFn : SignupUser
    })
}

export const useGetAllUsers = ( token : string ,query?: string)=>{
    return useQuery({
        queryKey : ['allUsers',query],
        queryFn : ()=>AllUserList(token,query),
    })
}

export const useSendMessage = ()=>{
    return useMutation({
        mutationFn : sendMessage
    })
}

export const useGetmessage = ( token : string ,query : string)=>{
    return useQuery({
        queryKey : ['Message',query],
        queryFn : ()=>getMessage(token,query)
    })
}

export const useUserDetail = (token : string )=>{
    return useQuery({
        queryKey : ['userDetail'],
        queryFn : ()=>getUserDetails(token)
    })
}