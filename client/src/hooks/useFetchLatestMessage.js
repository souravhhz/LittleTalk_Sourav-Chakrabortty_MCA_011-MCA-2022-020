import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatsContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notification } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
                if (response.error) {
                    console.error("Error getting messages...", response.error);
                    return;
                }

                const lastMessage = response[response?.length - 1];
                setLatestMessage(lastMessage);
            } catch (error) {
                console.error("Error getting messages...", error);
            }
        };
        getMessages();
    }, [newMessage, notification]);

    // Return the latest message from the hook
    return { latestMessage };
};


