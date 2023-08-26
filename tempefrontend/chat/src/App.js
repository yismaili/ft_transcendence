

  import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const ChatApp = () => {
  const [socket] = useState(io('http://localhost:3001'));
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [messageTextToChatRoom, setMessageTextToChatRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [chatRoomId, setchatRoom] = useState('');
  const [user, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [secondUser, setSecondUsername] = useState('');
  const [typingDisplay, setTypingDisplay] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editMessageText, setEditMessageText] = useState('');
  const [editMessageFomChatRoom, setEditMessageFomChatRoom] = useState('');
  const [name, setNameOfRomm] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [statusPermissions, setstatusPermissions] = useState('admin');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('typing', ({ name, isTyping }) => {
      if (isTyping) {
        setTypingDisplay(`${name} is typing...`);
      } else {
        setTypingDisplay('');
      }
    });
  }, [socket]);

  const join = () => {
    socket.emit('join', { user, secondUser }, () => {
      setJoined(true);
    });
  };

  const sendMessage = () => {
    socket.emit('createChat', { message: messageText, user, secondUser }, () => {
      setMessageText('');
    });
  };

  const sendMessageToChatRoom = () => {
    socket.emit('sendMessageToChatRoom', { message: messageTextToChatRoom, username: users, chatRoomId: chatRoomId}, () => {
     setMessageTextToChatRoom('');
    });
  };

  function getMessage() {
    socket.emit('findAllChat', { user, secondUser }, (response) => {
      setMessages(response);
    });
  }

  function updateMessage(index) {
    if (editMessageText !== '') {
      socket.emit('editMessage', {
        index,
        newMessage: editMessageText,
        user,
        secondUser,
      });
      setEditingIndex(-1);
      setEditMessageText('');
    }
  }

  function deleteMessage(index) {
    socket.emit('deleteMessage', { index, user, secondUser }, (response) => {
      setMessages(response);
    });
  }

  function deleteConversation() {
    socket.emit('deleteConversation', {user, secondUser }, (response) => {
      setMessages(response);
    });
  }
  let typingTimeout = null;

  const emitTyping = () => {
    clearTimeout(typingTimeout);
    socket.emit('typing', { user, isTyping: true });
    typingTimeout = setTimeout(() => {
      socket.emit('typing', { user, isTyping: false });
    }, 2000);
  };


const createChatRoom = () => {
    setstatusPermissions('admin');
    socket.emit('createChatRoom', {name: name, status: status , user: user, password: password, statusPermissions: statusPermissions}, (response) => {
      setMessageText('');
      setJoined(true);
      setchatRoom(response.id)
      console.log(chatRoomId);
    });
  };
const JoinUsertoRoom = () =>{
  socket.emit('JoinUsertoRoom', { username: users, statusPermissions: statusPermissions, chatRoomId: chatRoomId}, () => {
    setJoined(true);
  });
}

//   return (
//     <div className="chat">
//       {!joined ? (
//         <div>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               join();
//               getMessage();
//             }}
//           >
//             <label>Your user:</label>
//             <input value={user} onChange={(e) => setName(e.target.value)} />
//             <label>User of second user:</label>
//             <input
//               value={secondUser}
//               onChange={(s) => setSecondUsername(s.target.value)}
//             />
//             <button type="submit" disabled={user === '' || secondUser === ''}>
//               Join
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="chat-container">
//           <div className="messages-container">
//             {messages.map((msg, index) => (
//               <div key={index}>
//                 {editingIndex === index ? (
//                   <div>
//                     <input
//                       value={editMessageText}
//                       onChange={(e) => setEditMessageText(e.target.value)}
//                     />
//                     {/* <button onClick={() => updateMessage(index)}>Save</button>
//                     <button onClick={() => setEditingIndex(-1)}>Cancel</button> */}
//                   </div>
//                 ) : (
//                   <div>
//                     [{msg.user}]: {msg.message}
//                     {/* <span>
//                       <button onClick={() => deleteMessage(index)}>Delete</button>
//                       <button onClick={() => setEditingIndex(index)}>Edit</button>
//                     </span> */}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           {typingDisplay && <div>{typingDisplay}</div>}
//           <hr />
//           <div className="message-input">
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 sendMessage();
//                 getMessage();
//               }}
//             >
//               <input
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//                 onInput={emitTyping}
//               />
//                 <span>
//                       <button onClick={() => deleteConversation()}>Delete</button>
//                 </span>
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


return (
    <div className="chat">
      {!joined ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createChatRoom();
            }}
          >
            <label>user:</label>
                <input value={user} onChange={(e) => setName(e.target.value)} />
            <label> name: </label>
                <input value={name} onChange={(j) => setNameOfRomm(j.target.value)} />
            <label> status: </label>
                <input value={status} onChange={(k) => setStatus(k.target.value)} />
            <label>password:</label>
                <input value={password} onChange={(l) => setPassword(l.target.value)} />
            <button type="submit">
              Join
            </button>
          </form>
        </div>
          ) : (
        <div className="chat-container">
          <div className="messages-container">
            <span>
            <label> user: </label>
            <input value={users} onChange={(h) => setUsers(h.target.value)} />
            <label> statusPermissions: </label>
            <input value={statusPermissions} onChange={(k) => setstatusPermissions(k.target.value)} />
            <button onClick={() => JoinUsertoRoom()}>add</button>
            </span>
            {messages.map((msg, index) => (
              <div key={index}>
                {editingIndex === index ? (
                  <div>
                    <input
                      value={editMessageFomChatRoom}
                      onChange={(e) => setEditMessageFomChatRoom(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    [{msg.user}]: {msg.message}
                  </div>
                )}
              </div>
            ))}
          </div>
          {typingDisplay && <div>{typingDisplay}</div>}
          <hr />
          <div className="message-input">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessageToChatRoom();
                getMessage();
              }}
            >
              <input value={messageTextToChatRoom}
                onChange={(e) => setMessageTextToChatRoom(e.target.value)}
                onInput={emitTyping}
              />
                <span>
                      <button onClick={() => deleteConversation()}>Delete</button>
                </span>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
          )};
    </div>
  )
}
export default ChatApp;

