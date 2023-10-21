import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const ChatApp = () => {
  const [socket] = useState(io('0.0.0.0:3001', {
    extraHeaders: {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inlpc21haWxpIiwiZmlyc3ROYW1lIjoieW91bmVzIiwibGFzdE5hbWUiOiJpc21haWxpIiwiZW1haWwiOiJ5aXNtYWlsaTEzMzdAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0p5b1AtQm5mNzFVNUpwMHBYTl9pTFIwcHRYMlZZeGdMR2VzT0JOSUppVjlnPXM5Ni1jIiwicHJvZmlsZSI6eyJzY29yZSI6MCwibG9zIjowLCJ3aW4iOjAsInhwIjowLCJsZXZlbCI6MCwiaWQiOjN9LCJzdGF0dXMiOm51bGwsInR3b0ZhY3RvckF1dGhTZWNyZXQiOm51bGwsImlkIjozLCJpc1R3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwiaWF0IjoxNjk2MDkwNTY2fQ.C6zgTQ6etizjTF9b1n4yDofPyPjNhzvdMyBYPwep9-M'
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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(message);
    });
    socket.on('updateUI', (messaged) => {
      console.log(messaged);
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
      setMessages(response);
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
    socket.emit('createChatRoom', {name: name, status: status , user: user, password: password, statusPermissions: statusPermissions, picture: selectedImage}, (response) => {
      setMessageText('');
      setJoined(true);
      setchatRoomName(response.RoomId);
    });
  };

const handleImageChange = (e) => {
  // Capture the selected image from the input element
  const image = e.target.files[0];
  setSelectedImage(image);
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
  socket.emit('deleteChatRoom', {username: user, chatRoomName: chatRoomName});
}

const getAllChatRoom = () => {
  socket.emit('AllchatRoom', {username: user}, (response) => {
  });
}

const getAllUserOfChatRoom = () => {
  socket.emit('getAllUserOfChatRoom', {username: user, chatRoomName:chatRoomName}, (response) => {
  });
}
const updateUI = () => {
  socket.emit('updateUI', {message: 'hi from update UI'});
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
//             <img src='data:image/png;base64,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'></img>
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
//                 //getMessage();
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
          <spam>
          <label> chatName: </label>
          <input value={chatRoomName} onChange={(e) => setchatRoomName(e.target.value)} />
          <label> user: </label>
          <input value={user} onChange={(e) => setName(e.target.value)} />
          <button onClick={() => joinChatRoomWithAdmin()}>Jion my ChatRomm</button>
          <button onClick={() => getAllChatRoom()}>get chatRooms</button>
          <button onClick={() => joinChatRoom()}>Jion chatRoom</button>
          <button onClick={() => updateUI()}>updateUI</button>
        </spam>
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
            <label>picture:</label>
            <input type="file" onChange={handleImageChange} />
            <button type="submit">
              create Room
            </button>
          </form>
            {/* {allchatroomOfuser && <div>{allchatroomOfuser}</div>}
         <hr /> */}
        </div>
         
         ) : (
        <div className="chat-container">
          <div className="messages-container">
            <span>
            <spam>
              <label> user: </label>
              <input value={users} onChange={(e) => setUsers(e.target.value)} />
              <label> User status : </label>
              <input value={userstatus} onChange={(e) => setUserstatus(e.target.value)}/>
              <label> time : </label>
              <input value={time} onChange={(e) => setTime(e.target.value)} />
              <button onClick={() => banUser()}>Ban user</button>
              <button onClick={() => kickUser()}>kick user</button>
              <button onClick={() => muteUser()}>Mut user</button>
              <button onClick={() => unbannedUser()}>unbanned User</button>
              <button onClick={() => changePermission()}>change Permission</button>
              <button onClick={() => leaveChatRoom()}>leave ChatRoom</button>
              <button onClick={() => getAllUserOfChatRoom()}>User Of ChatRoom</button>
              <button onClick={() => deleteChatRoom()}>Delete</button>
           </spam>
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
              }}
            >
              <input value={messageTextToChatRoom}
                onChange={(e) => setMessageTextToChatRoom(e.target.value)}
                onInput={emitTyping}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
          )};
    </div>
  )
}
 export default ChatApp;

