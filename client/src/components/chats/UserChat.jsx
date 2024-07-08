import { Stack } from "react-bootstrap";
import { useFatchRecipientUser } from "../../hooks/useFetchrecipient";
import avatar from "../../assets/Avatar/male-0.png";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { unReadnotificationFunc } from "../../utils/unreadNotification";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";


const UserChat = ({chat,user}) => {
    const {recipientUser} = useFatchRecipientUser(chat, user);
    const {onlineusers,notification,markThisUsernotificationAsRead}  = useContext(ChatContext);
    const { latestMessage } = useFetchLatestMessage(chat);
    const unreadNotification = unReadnotificationFunc(notification);
    const thisUserNotification = unreadNotification?.filter(
        n => n.senderId === recipientUser?._id
    )
    const isOnline = onlineusers?.some((user)=>user?.userId === recipientUser?._id);
    // console.log("online",user.name,isOnline);
    const trucateText = (text) =>{
        let shortText = text.substring(0,20);
        if(text.length > 20){
            shortText = shortText + "..."
        }
        return shortText
    }
    const phoneVchat = () =>{
        const chatbox1 = document.getElementById("Ph-chatbox");
        const chatbox2 = document.getElementById("ph-mas-box");

        chatbox1.classList.add("Show-Mob-V");
        chatbox2.classList.add("hide-Mob-V");

    }


    return (
    <>
    <Stack direction="horizontal"  
    className="user-card align-items-center justify-content-between MobVuser-card"
    role="button"
    onClick={()=>{
        if(thisUserNotification?.length !==0){
            markThisUsernotificationAsRead(thisUserNotification,notification);
        }
        phoneVchat();
        
    }}
    >
        <div className="d-flex">
            <div className="me-2" style={{"padding":"7px 5px"}}>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" height="30px"/>
            </div>
            <div className="text-content">
                <div className="name">
                    {recipientUser?.name}
                </div>
                <div className="text">
                    {latestMessage?.text && 
                    (<span>{trucateText(latestMessage?.text)}</span>)
                    }
                </div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
            <div 
            className={thisUserNotification?.length > 0 ? "this-user-notifications" :""}
            >
                {thisUserNotification?.length>0?thisUserNotification?.length:""}
                </div>
            <span className={isOnline?"user-online":"user-offline"}></span>
        </div>
    </Stack>
    </>  
    );
}
 
export default UserChat;