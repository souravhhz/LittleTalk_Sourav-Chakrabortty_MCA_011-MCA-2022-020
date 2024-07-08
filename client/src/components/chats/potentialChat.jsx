import { useContext } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { AuthContext } from "../../context/AuthContext";
import { BsFillSearchHeartFill } from "react-icons/bs";
import '../chats/css/Chat.css';

const PotentialChats = () => {
    const {user} = useContext(AuthContext);
    const {potentialChats,createChat,onlineusers} = useContext(ChatContext);
    // console.log("pchats",potentialChats);
    
    return ( 
    <>
        <div className="all-users">
            {potentialChats && 
                potentialChats.slice(0, 5).map((U, index) => (
                    <div className="single-user" key={index} onClick={() => createChat(user._id, U._id)}>
                        <span className="userName">{`${U.name.substring(0, 3)}..`}</span>
                        <span  className={`${onlineusers?.some(user => user?.userId === U?._id) ? "user-online" : "user-offline"} `}></span>
                    </div>
                ))
            }
            <span className="userSearch"><BsFillSearchHeartFill size={20} /></span>
        </div>
        
    </>
     );
}
 
export default PotentialChats;