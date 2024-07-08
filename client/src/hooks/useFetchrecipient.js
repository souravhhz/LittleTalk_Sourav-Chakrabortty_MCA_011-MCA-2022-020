import { useEffect,useState } from "react";
import { baseUrl, getRequest } from "../utils/services";


export const useFatchRecipientUser = (chat, user) =>{
    const [recipientUser,setRecipientUser] = useState(null);
    const [error,setError] = useState(null)
    // console.log("fff",chat, user,"eee");
    const recipientId = chat?.members.find((id)=> id !==user?._id)

    useEffect(()=>{
        const getUser = async()=>{
            
            if(!recipientId) return null
            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
            // console.log(`${baseUrl}/users/find/${recipientId}`)
            if(response.error){
                return setError(error);
            }
            // console.log("recipientUser",response)
            setRecipientUser(response)
        }
        // alert(recipientUser);
        getUser()
    },[recipientId]) ; 
    return {recipientUser,error};
}