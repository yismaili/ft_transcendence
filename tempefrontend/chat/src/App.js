import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const ChatApp = () => {
  const [socket] = useState(io('0.0.0.0:3001', {
    extraHeaders: {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ5aXNtYWlsaSIsImZpcnN0TmFtZSI6InlvdW5lcyIsImxhc3ROYW1lIjoiaXNtYWlsaSIsImVtYWlsIjoieWlzbWFpbGkxMzM3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKeW9QLUJuZjcxVTVKcDBwWE5faUxSMHB0WDJWWXhnTEdlc09CTklKaVY5Zz1zOTYtYyIsInByb2ZpbGUiOnsiaWQiOjEsInNjb3JlIjowLCJsb3MiOjAsIndpbiI6MCwieHAiOjAsImxldmVsIjowfSwidXNlclJlbGF0aW9ucyI6W10sImZyaWVuZFJlbGF0aW9ucyI6W10sImFjaGlldmVtZW50cyI6W10sImhpc3RvcmllcyI6W10sImlhdCI6MTY5NDg2OTE1M30._BgOmYPL6IU0NV0VPf7W0G31DfT6wEvE-GuyMIRUsIk'
    }
  }));
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [messageTextToChatRoom, setMessageTextToChatRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [chatRoomId, setchatRoom] = useState('');
  const [user, setName] = useState('');
  const [username, setUsername] = useState('');
  const [chatRoomName, setchatRoomName] = useState('');
  const [users, setUsers] = useState([]);
  const [secondUser, setSecondUsername] = useState('');
  const [typingDisplay, setTypingDisplay] = useState('');
  const [allchatroomOfuser, setallchatroomOfuser] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editMessageText, setEditMessageText] = useState('');
  const [editMessageFomChatRoom, setEditMessageFomChatRoom] = useState('');
  const [name, setNameOfRomm] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [statusPermissions, setstatusPermissions] = useState('admin');
  const [userstatus, setUserstatus] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(message);
    });
    
    socket.on('istyping', (isTyping) => {
      if (!isTyping) {
        setTypingDisplay('');
      } else {
        setTypingDisplay(`is typing...`);
      }
    });
  }, socket);

  const join = () => {
    socket.emit('join', { user, secondUser }, () => {
      setJoined(true);
    });
  };

  const sendMessage = () => {
    socket.emit('createChat', { message: messageText, user, secondUser }, (response) => {
      // setMessages(response);
    });
  };

  const sendMessageToChatRoom = () => {
    socket.emit('sendMessageToChatRoom', { message: messageTextToChatRoom, username: user, chatRoomName: chatRoomName}, () => {
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
    socket.emit('istyping', {isTyping: true });
    typingTimeout = setTimeout(() => {
      socket.emit('istyping', {isTyping: false });
    }, 2000);
  };


const createChatRoom = () => {
    setstatusPermissions('admin');
    socket.emit('createChatRoom', {name: name, status: status , user: user, password: password, statusPermissions: statusPermissions}, () => {
      setMessageText('');
      setJoined(true);
      setchatRoomName(name);
    });
  };
  
const JoinUsertoRoom = () =>{
  socket.emit('JoinUsertoRoom', { adminUsername: user, username: users, statusPermissions: statusPermissions, chatRoomName: chatRoomName}, () => {
    setJoined(true);
  });
}

function getMessageFromchatRoom() {
  socket.emit('findAllChatRoomConversation', { username: user, chatRoomName: chatRoomName}, (response) => {
    setMessages(response);
  });
}

const joinChatRoomWithAdmin = () => {
  socket.emit('joinChatRoomWithAdmin', {username: user,  chatRoomName: chatRoomName}, (response) => {
    setJoined(true);
    setMessages(response);
  });
}

const joinChatRoom = () => {
  socket.emit('joinChatRoom', {username: user,  chatRoomName: chatRoomName, password:password}, (response) => {
    setJoined(true);
    setMessages(response);
  });
}

const banUser = () => {
  socket.emit('banUser', {username: user, chatRoomName: chatRoomName, userGetBan:users ,userstatus: userstatus}, (response) => {
    setJoined(true);
  });
}

function kickUser(){
  socket.emit('kickUser', {username: user, chatRoomName: chatRoomName, userGetkick:users ,userstatus: userstatus}, (response) => {
    setJoined(true);
  });
}

const muteUser = () => {
  socket.emit('muteUser', {username: user, chatRoomName: chatRoomName, userGetmute:users, time:time,userstatus: userstatus}, (response) => {
    setJoined(true);
  });
}

const getChatRoom = () => {
  socket.emit('chatRoomOfUser', {username: user}, (response) => {
        setallchatroomOfuser(response);
  });
 }

 const unbannedUser = () => {
  socket.emit('unbannedUser', {username: user, chatRoomName: chatRoomName, userGetBan:users ,userstatus: userstatus}, (response) => {
    setJoined(true);
  });
}
const changePermission = () => {
  socket.emit('changePermission', {username: user, chatRoomName: chatRoomName, userGetBan:users}, (response) => {
    setJoined(true);
  });
}
const leaveChatRoom = () => {
  socket.emit('leaveChatRoom', {username: user, chatRoomName: chatRoomName}, (response) => {
  });
}
const deleteChatRoom = () => {
  socket.emit('deleteChatRoom', {username: user, chatRoomName: chatRoomName}, (response) => {
  });
}

const getAllChatRoom = () => {
  socket.emit('AllchatRoom', {username: user}, (response) => {
  });
}

const getAllUserOfChatRoom = () => {
  socket.emit('getAllUserOfChatRoom', {username: user, chatRoomName:chatRoomName}, (response) => {
  });
}
  return (
    <div className="chat">
      {!joined ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              join();
              getMessage();
            }}
          >
            <label>Your user:</label>
            <input value={user} onChange={(e) => setName(e.target.value)} />
            <label>User of second user:</label>
            <input
              value={secondUser}
              onChange={(s) => setSecondUsername(s.target.value)}
            />
            <button type="submit" disabled={user === '' || secondUser === ''}>
              Join
            </button>
          </form>
        </div>
      ) : (
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index}>
                {editingIndex === index ? (
                  <div>
                    <input
                      value={editMessageText}
                      onChange={(e) => setEditMessageText(e.target.value)}
                    />
                    {/* <button onClick={() => updateMessage(index)}>Save</button>
                    <button onClick={() => setEditingIndex(-1)}>Cancel</button> */}
                  </div>
                ) : (
                  <div>
                    [{msg.user}]: {msg.message}
                    {/* <span>
                      <button onClick={() => deleteMessage(index)}>Delete</button>
                      <button onClick={() => setEditingIndex(index)}>Edit</button>
                    </span> */}
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
                sendMessage();
                //getMessage();
              }}
            >
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onInput={emitTyping}
              />
                <span>
                      <button onClick={() => deleteConversation()}>Delete</button>
                </span>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


// return (
//     <div className="chat">
//       {!joined ? (
//         <div>
//           <spam>
//           <label> chatName: </label>
//           <input value={chatRoomName} onChange={(e) => setchatRoomName(e.target.value)} />
//           <label> user: </label>
//           <input value={user} onChange={(e) => setName(e.target.value)} />
//           <button onClick={() => joinChatRoomWithAdmin()}>Jion my ChatRomm</button>
//           <button onClick={() => getAllChatRoom()}>get chatRooms</button>
//           <button onClick={() => joinChatRoom()}>Jion chatRoom</button>
//         </spam>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               createChatRoom();
//             }}
//           >
//             <label>user:</label>
//                 <input value={user} onChange={(e) => setName(e.target.value)} />
//             <label> name: </label>
//                 <input value={name} onChange={(j) => setNameOfRomm(j.target.value)} />
//             <label> status: </label>
//                 <input value={status} onChange={(k) => setStatus(k.target.value)} />
//             <label>password:</label>
//                 <input value={password} onChange={(l) => setPassword(l.target.value)} />
//             <button type="submit">
//               create Chat Room
//             </button>
//           </form>
//             {/* {allchatroomOfuser && <div>{allchatroomOfuser}</div>}
//          <hr /> */}
//         </div>
         
//          ) : (
//         <div className="chat-container">
//           <div className="messages-container">
//             <span>
//             <spam>
//               <label> user: </label>
//               <input value={users} onChange={(e) => setUsers(e.target.value)} />
//               <label> User status : </label>
//               <input value={userstatus} onChange={(e) => setUserstatus(e.target.value)}/>
//               <label> time : </label>
//               <input value={time} onChange={(e) => setTime(e.target.value)} />
//               <button onClick={() => banUser()}>Ban user</button>
//               <button onClick={() => kickUser()}>kick user</button>
//               <button onClick={() => muteUser()}>Mut user</button>
//               <button onClick={() => unbannedUser()}>unbanned User</button>
//               <button onClick={() => changePermission()}>change Permission</button>
//               <button onClick={() => leaveChatRoom()}>leave ChatRoom</button>
//               <button onClick={() => getAllUserOfChatRoom()}>User Of ChatRoom</button>
//            </spam>
//             <label> user: </label>
//             <input value={users} onChange={(h) => setUsers(h.target.value)} />
//             <label> statusPermissions: </label>
//             <input value={statusPermissions} onChange={(k) => setstatusPermissions(k.target.value)} />
//             <button onClick={() => JoinUsertoRoom()}>add</button>
//             </span>
//             {messages.map((msg, index) => (
//               <div key={index}>
//                 {editingIndex === index ? (
//                   <div>
//                     <input
//                       value={editMessageFomChatRoom}
//                       onChange={(e) => setEditMessageFomChatRoom(e.target.value)}
//                     />
//                   </div>
//                 ) : (
//                   <div>
//                     [{msg.user}]: {msg.message}
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
//                 sendMessageToChatRoom();
//                 //getMessageFromchatRoom();
//               }}
//             >
//               <input value={messageTextToChatRoom}
//                 onChange={(e) => setMessageTextToChatRoom(e.target.value)}
//                 onInput={emitTyping}
//               />
//                 <span>
//                       <button onClick={() => deleteChatRoom()}>Delete</button>
//                 </span>
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//           )};
//     </div>
//   )
// }
export default ChatApp;

