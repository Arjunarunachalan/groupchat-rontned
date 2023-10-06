import React,{useEffect, useState} from 'react'
import ScrolltoBottom from "react-scroll-to-bottom"

const Chats = ({socket,username,room}) => {

    const [currentMessage,setCurrentMessage] = useState("");
    const [messageList,setMessageList] = useState([]);

    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message",messageData)
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("")
      }
    };

    useEffect(()=>{
  socket.on("recieve_mesasage", (data) => {
    setMessageList((list) => [...list, data]);
  });
  return ()=>{
    socket.off("recieve_mesasage");
  }
 
    },[socket])




  return (
    <div className='chat'>
      <div className="chat-header">
        <h2>Live Chat</h2>
      </div>
      <div className="chat-body">
        <ScrolltoBottom className='scroll'>
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-contant">
                    <p className='messagedata'>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p className='author'>{messageContent.author}</p>
                    <p className='time'>{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrolltoBottom>
      </div>
      <div className="chat-footer">
        <input
        className='inputMessage'
          type="text"
          value={currentMessage}
          placeholder="hey"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button className='send' onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chats