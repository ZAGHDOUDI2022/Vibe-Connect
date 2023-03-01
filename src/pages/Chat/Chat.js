import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ChatBox from '../../components/Chatt/ChatBox/ChatBox';
import Conversation from '../../components/Chatt/Coversation/Conversation';
import NavIcons from '../../components/Chatt/NavIcons/NavIcons';
import LogoSearch from '../../components/POST_SLIDE/LogoSearch/LogoSearch';
import { userChats } from '../../Redux/api/ChatRequests';
import {io} from 'socket.io-client'
import "./Chat.css";

function Chat() {
    const { user } = useSelector((state) => state.authReducer.authData);
    const socket = useRef();

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);
     
    
     // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
              {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
          {chats.map((chat) => (
              <div
              onClick={() => {
                setCurrentChat(chat);
              }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      

       {/* Right Side */}

       <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        <NavIcons />
        
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>





    </div>
  )
}

export default Chat
