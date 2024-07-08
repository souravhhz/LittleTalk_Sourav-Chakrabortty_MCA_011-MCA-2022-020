import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadnotificationFunc } from "../../utils/unreadNotification";
import moment from "moment";

const Notification = () => {
    const [isOpen,setIsOpen] = useState(false);
    const {user } = useContext(AuthContext);
    const {notification,userChats,allUsers,markAllNotificationAsRead,markNotificationsAsRead}=useContext(ChatContext);
    const unReadNotifications = unReadnotificationFunc(notification);
    const modifiedNotification = notification.map((n)=>{
        const sender = allUsers.find((user)=>user._id=n.senderId);
        return {
            ...n,
            senderName:sender?.name,
        };
    });

    return ( 
    <>
    <div className="notifications">
        <div className="notifications-icon" onClick={()=>setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="25" 
            height="22"
            fill="currentColor" 
            className="bi bi-chat-dots-fill" 
            viewBox="0 0 16 16">
            <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            </svg>
            {unReadNotifications?.length === 0 ? null:(
                <span className="notification-count">
                    <span>{unReadNotifications?.length}</span>
                </span>
            )}
        </div>
        {isOpen ? 
            (<div className="notifications-box">
                <div className="notifications-header">
                    <h3>Notifications</h3>
                    <div className="mark-as-read" onClick={()=>markAllNotificationAsRead(notification)}>
                        Mark all as read
                    </div>
                    {modifiedNotification?.length === 0?
                    <span className="notification">No notification yet...</span>:null}
                    {modifiedNotification && modifiedNotification.map((n,index)=>{
                        return( 
                        <div 
                        className={n.isRead?'notification':'notification not-read'} 
                        key={index}
                        onClick={()=>{markNotificationsAsRead(n,userChats,user,notification);
                        setIsOpen(false);
                        }}
                        >
                            <span>{`${n.senderName} send you a new message`}</span>
                            <span className="notification-time">{moment(n.date).calendar()}</span>
                        </div>
                        )
                    })}
                </div>
            </div>):null
        }
        
    </div>
    </> );
}
 
export default Notification;