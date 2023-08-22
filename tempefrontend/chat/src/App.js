import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [socket] = useState(io('http://localhost:3001'));
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [joined, setJoined] = useState(false);
  const [user, setName] = useState('');
  const [secondUser, setSecondUsername] = useState('');
  const [typingDisplay, setTypingDisplay] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
   
      // socket.emit('findAllChat', {user: user, secondUser: secondUser}, (response) => {
      //   setMessages(response);
      // });

      socket.on('typing', ({ user, isTyping }) => {
        if (isTyping) {
          setTypingDisplay(`${user} is typing...`);
        } else {
          setTypingDisplay('');
        }
      });
    }, [socket]);


  const join = () => {
    console.log('Joining with user:', user);
    socket.emit('join', { user, secondUser }, () => {
      setJoined(true);
    });
  };

  const sendMessage = () => {
    socket.emit('createChat', { message: messageText, user: user, secondUser: secondUser }, () => {
      setMessageText('');
    });
  };

  const getdMessage = () => {
    socket.emit('findAllChat', {user: user, secondUser: secondUser },(response) => {
      setMessages(response);
    });
  };

  let typingTimeout = null;

  const emitTyping = () => {
    clearTimeout(typingTimeout);
    socket.emit('typing', { user, isTyping: true });
    typingTimeout = setTimeout(() => {
      socket.emit('typing', { user, isTyping: false });
    }, 2000);
  };

  return (
    <div className="chat">
      {!joined ? (
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            join();
            getdMessage();
          }}>
            <label>your user </label>
            <input value={user} onChange={(e) => {
                                                      setName(e.target.value);
            }} />
            <label>user of second user </label>
            <input value={secondUser} onChange={(s) => {
                                                      setSecondUsername(s.target.value);
            }} />
            <button type="submit" disabled={user === '' || secondUser === ''} >Join</button>
          </form>

        </div>
      ) : (
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index}>
                [{msg.user}]: {msg.message}
              </div>
            ))}
          </div>
          {typingDisplay && <div>{typingDisplay}</div>}
          <hr />
          <div className="message-input">
            <form onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
              getdMessage();
            }}>
              <label>Message:</label>
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onInput={emitTyping}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
