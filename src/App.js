
import './App.css';
import io from "socket.io-client"
import { useState } from 'react';
import Chats from './Chats';

const socket = io.connect("http://localhost:3001");

function App() {
const  [username, setUsername] = useState("")
const  [room, setRoom] = useState("")
const  [showChat, setShowChat] = useState(false)

const joinroom =()=>{
  if(username !== "" && room !== ""){
    socket.emit("joinroom",room)
    setShowChat(true)
  }
}

  return (
    <div className="App">
      {!showChat ? (
       
          <div className="content_container">
            <div className="form_conatiner">
              <h3 className="join_head">Join A Room</h3>
              <div className="">
                <input
                className='name'
                  type="text"
                  placeholder="username....."
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="room">
                <input
                className='room'
                  type="text"
                  placeholder="Room Id...."
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />
              </div>
              <div className="botton">
                <button className='button' onClick={joinroom}>Join a Room </button>
              </div>
            </div>
          </div>
      
      ) : (
        <Chats socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
