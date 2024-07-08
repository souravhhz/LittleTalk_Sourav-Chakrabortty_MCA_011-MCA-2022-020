import { createContext, useCallback, useEffect, useState } from "react";
import {baseUrl,postRequest, getRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

// export const ChatContextProvider = ({children , user}) =>{
//     const [userChats,setUserChats] = useState(null);
//     const [isUserChatLoading,setIsUserChatLoading] = useState(false);
//     const [userChatsError,setUserChatsError] = useState(null);

//     useEffect(()=>{
//         const getUserChats = async ()=>{
//             if(user?._id){
//                 setIsUserChatLoading(true);
//                 setUserChatsError(null);
//                 const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
//                 setIsUserChatLoading(false);
//                 if(response.error){
//                     return setUserChatsError(response);
//                 }
//                 setUserChats(response);
//             }
//         };
//         getUserChats();
//     },[user])

//     return 
//     (
//     <ChatContext.Provider
//         value={{
//             userChats,
//             isUserChatLoading,
//             userChatsError
//         }}
//     >
//         {children}
//     </ChatContext.Provider>
//     )
// }



export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats,setPotentioalChats] = useState([]);
    const[currentChats,setCurrentChats] = useState(null);
    const[messages,setMessages] = useState(null);
    const[isMessagesLoading,setIsMessageLoading] = useState(false);
    const [messageError,setMessageError] = useState(null);
    const [sendtextMessageError,setSendtextMessageError] = useState(null);
    const [newMessage,setNewMessage] = useState(null);
    const [socket,setSocket] = useState(null);
    const [onlineusers,setOnlineUsers] = useState([]);
    const[notification,setNotification] = useState([]);
    const [allUsers,setAllUsers] = useState([]);

    // console.log("notification",notification);
    // console.log('messages',messages);

    useEffect(()=>{
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);
      return ()=>{
        newSocket.disconnect()
      }
    },[user])

    // add online users
    useEffect(()=>{
      if(socket === null) return
      socket.emit("addNewuser",user?._id);
      socket.on("getOnlineUsers",(res)=>{
        setOnlineUsers(res);
      });
      return () =>{
        socket.off("getOnlineUsers");
      };
    },[socket])

    //send message realtime
    useEffect(()=>{
      if(socket === null) return
      const recipientId = currentChats?.members.find((id)=> id !==user?._id)
      socket.emit("sendMessage",{...newMessage,recipientId});
    },[newMessage])

    //recive message and notofication
    useEffect(()=>{
      if(socket === null) return
      socket.on("getMessage",res=>{
        if(currentChats?._id !== res.chatId) return;
        setMessages((prev)=>[...prev,res]);
      })
      socket.on("getNotification",(res)=>{
        const isChatOpen = currentChats?.members.some((id)=> id === res.senderId);
        if(isChatOpen){
          setNotification(prev=>[{...res,isRead:true},...prev])
        }else{
          setNotification(prev=>[res,...prev]);
        }
      });
      return ()=>{
        socket.off("getMessage")
        socket.off("getNotification");
      };
    },[socket,currentChats])

    useEffect(()=>{
      const getUsers  = async() =>{
        const response = await getRequest(`${baseUrl}/users/all/users/`);
        if(response.error){
          return console.log("Error fatching users",respones);
        }
        const pChats=response.filter((u)=>{
          let isChatcreated = false;
          if(user?._id === u._id) {
            return false;
          }
          if(userChats){
            isChatcreated = userChats?.some((chat)=>{
              return (chat.members[0] === u._id || chat.members[1] === u._id);
            })
          }

          return !isChatcreated;

        })
        // console.log("pChats",pChats)
        setPotentioalChats(pChats);
        setAllUsers(response);
      };
      getUsers();
    },[userChats])
  
    useEffect(() => {
      const getUserChats = async () => {
        if (user?._id) {
          setIsUserChatLoading(true);
          setUserChatsError(null);
          const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
          setIsUserChatLoading(false);
          if (response.error) {
            return setUserChatsError(response);
          }
          setUserChats(response);
        }
      };
      getUserChats();
    }, [user,notification]);

    useEffect(() => {
      const getMessages = async () => {
       
          setIsMessageLoading(true);
          setMessageError(null);
          const response = await getRequest(`${baseUrl}/messages/${currentChats?._id}`);
          setIsMessageLoading(false);
          if (response.error) {
            return setMessageError(response);
          }
          setMessages(response);
      };
      getMessages();
    }, [currentChats]);

    const sendTextMessage = useCallback( async(textMessage,sender,currentChatId,setTextMessage)=>{
      if(!textMessage){
        return console.log("You Must type Something...")
      }
      const response = await postRequest(`${baseUrl}/messages/`,JSON.stringify({
        chatId:currentChatId,
        senderId:sender._id,
        text:textMessage
      }))
      if (response.error) {
        return setSendtextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev)=>[...prev,response])
      setTextMessage("");

    },[])

    const updateCurrentChats = useCallback((chat)=>{
      // alert(chat.members);
      // console.log(chat);
      setCurrentChats(chat);
    },[])

    const createChat =useCallback( async (firstId,secondId) =>{
      const response = await postRequest(`${baseUrl}/chats`,
        JSON.stringify({
          firstId,
          secondId,
        })
      );
      if(response.error){
        return console.log("Error creating chat",response);
      }
      setUserChats((prev)=>[...prev,response]);
    },[])

    //mark all notification
    const markAllNotificationAsRead = useCallback((notification)=>{
      const mNotification = notification.map(n=>{return {...n,isRead:true}});
      setNotification(mNotification);
    },[])

    // Notfication functions
    const markNotificationsAsRead = useCallback((n,userChats,user,notification)=>{
      // find chat to open
      const desiredChat = userChats.find(chat =>{
        const chatMembers = [user._id,n.senderId];
        const isDesiredChat = chat?.members.every((member)=>{
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });
      // mark notification as read
      const mNotification = notification.map((el)=>{
        if(n.senderId === el.senderId){
          return {...n,isRead:true}
        }
        else{
          return el
        }
      })

      updateCurrentChats(desiredChat);
      setNotification(mNotification);

    },[])

    // clear nitification on chat
    const markThisUsernotificationAsRead = useCallback((thisUserNotification,notification)=>{
      const mNotification = notification.map(el=>{
        let notifications;
        thisUserNotification.forEach(n=>{
          if(n.senderId === el.senderId){
            notifications = {...n,isRead:true}
          }
          else{
            notifications = el
          }
        })
        return notifications
      })
      setNotification(mNotification);
    },[])

  
    return (
      <ChatContext.Provider
        value={{
          userChats,
          isUserChatLoading,
          userChatsError,
          potentialChats,
          createChat,
          currentChats,
          updateCurrentChats,
          messages,
          isMessagesLoading,
          messageError,
          sendTextMessage,
          onlineusers,
          notification,
          allUsers,
          markAllNotificationAsRead,
          markNotificationsAsRead,
          markThisUsernotificationAsRead
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  };
  