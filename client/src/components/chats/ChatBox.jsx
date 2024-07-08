import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatsContext";
import { useFatchRecipientUser } from "../../hooks/useFetchrecipient";
import { Stack } from "react-bootstrap";
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import { IoSend } from "react-icons/io5";




const ChatBox = () => {
    const {user} = useContext(AuthContext);
    const {currentChats,messages,isMassagesLoading,messageError,sendTextMessage} = useContext(ChatContext);
    // console.log(currentChats)
    const {recipientUser} = useFatchRecipientUser(currentChats,user);
    const [textMessage,setTextMessage] = useState("");
    const scroll = useRef();

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[messages])

    // console.log("text",textMessage);
    // console.log(currentChats)
    // alert(recipientUser)
    if(!recipientUser){
        return (
            <p id='NoConSec' style={{textAlign:"center",width:"100%"}}>
                No conversation selected ..
            </p>
        )
    };
    if(isMassagesLoading){
        return (
            <p style={{textAlign:"center",width:"100%"}}>
                Loading messages ...
            </p>
        )
    }
    return ( 
    <>
    
        <Stack id="Ph-chatbox" className="chat-box">
            <div className="chat-header">
                <strong>
                    {recipientUser?.name}
                </strong>
            </div>
            <Stack  className="messages" >
                {messages && messages.map((message,index)=>
                    <Stack key={index} className={`${message?.senderId===user?._id ? "message self align-self-end flex-grow-0":"message align-self-start flex-grow-0"}`}
                    ref = {scroll}>
                        <span>{message.text}</span>
                        {/* <span>{message.createdAt}</span> */}
                        <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                    </Stack>
                )}
            </Stack>
            <Stack direction="horizontal"  className="chat-input flex-grow-0">
                <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily="nunito" borderColor="rgba(72,112,233,0.2)" />
                <button className="send-btn" style={{"backgroundColor":"#f8f9fa","padding":"5px 5px"}} onClick={()=>sendTextMessage(textMessage,user,currentChats._id,setTextMessage)}>
                    <IoSend color="green"   />
                </button>
            </Stack>
        </Stack>
    </>
     );
}



 
export default ChatBox;