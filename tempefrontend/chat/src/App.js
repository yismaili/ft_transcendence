import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [socket] = useState(io('http://localhost:3000'));
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [joined, setJoined] = useState(false);
  const [username, setName] = useState('');
  const [secondUsername, setSecondUsername] = useState('');
  const [typingDisplay, setTypingDisplay] = useState('');

  useEffect(() => {
    
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    socket.emit('findAllChat', {}, (response) => {
      setMessages(response);
    });
    socket.on('typing', ({ username, isTyping }) => {
      if (isTyping) {
        setTypingDisplay(`${username} is typing...`);
      } else {
        setTypingDisplay('');
      }
    });
  }, [socket]);


  const join = () => {
    console.log('Joining with username:', username);
    socket.emit('join', { username, secondUsername }, () => {
      setJoined(true);
    });
  };

  const sendMessage = () => {
    socket.emit('createChat', { text: messageText, username: username, secondUsername: secondUsername }, () => {
      setMessageText('');
    });
  };

  const getdMessage = () => {
    socket.emit('findAllChat', {username: username, secondUsername: secondUsername },(response) => {
      setMessages(response);
    });
  };

  let typingTimeout = null;

  const emitTyping = () => {
    clearTimeout(typingTimeout);
    socket.emit('typing', { username, isTyping: true });
    typingTimeout = setTimeout(() => {
      socket.emit('typing', { username, isTyping: false });
    }, 2000);
  };

  return (
    <div className="chat">
      {!joined ? (
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            join();
          }}>
            <label>your username </label>
            <input value={username} onChange={(e) => {setName(e.target.value);
                                                      getdMessage();
            }} />
            <label>username of second user </label>
            <input value={secondUsername} onChange={(s) => setSecondUsername(s.target.value)} />
            <button type="submit" disabled={username === '' || secondUsername === ''}>Join</button>
          </form>

        </div>
      ) : (
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index}>
                [{msg.username}]: {msg.text}
              </div>
            ))}
          </div>
          {typingDisplay && <div>{typingDisplay}</div>}
          <hr />
          <div className="message-input">
            <form onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
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
