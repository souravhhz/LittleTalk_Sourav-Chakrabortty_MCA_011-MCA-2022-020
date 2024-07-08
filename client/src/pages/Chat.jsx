import { useContext } from "react";
import { ChatContext } from "../context/ChatsContext";
import { Container, Stack} from 'react-bootstrap'
import UserChat from "../components/chats/UserChat";
import {AuthContext}from "../context/AuthContext";
import PotentialChats from "../components/chats/potentialChat";
import ChatBox from "../components/chats/ChatBox";
import "../pages/css/ChatSlide.css";

const Chat = () => {
    const {user} = useContext(AuthContext);
    const {userChats, isUserChatLoading,userChatsError,updateCurrentChats} = useContext(ChatContext);
    // console.log("userchats",userChats);
    
    return ( 
    <>
    <Container>
        <PotentialChats/>
        {
            userChats?.lengh < 1 ? null :
            <Stack direction="horizontal" 
            gap={4} 
            className="align-items-start userHand">
                <Stack id="ph-mas-box" className="messages-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatLoading && <p>Loading Chats...</p>}
                    {userChats?.map((chat,index)=>{
                        return(
                            <div key={index} onClick={()=> updateCurrentChats(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        )
                    })}
                </Stack>
                <ChatBox/>
            </Stack>


        }
    </Container>
    </> 
    );
}
 
export default Chat;