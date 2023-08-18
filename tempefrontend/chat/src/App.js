import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://10.13.10.1:3000');

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState('');
  const [typingDisplay, setTypingDisplay] = useState('');

  useEffect(() => {
    socket.emit('findAllChat', {}, (response) => {
      setMessages(response);
    });

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
  }, []);

  const join = () => {
    console.log('Joining with name:', name);
    socket.emit('join', { name }, () => {
      setJoined(true);
    });
  };

  const sendMessage = () => {
    socket.emit('createChat', { text: messageText}, () => {
      setMessageText('');
    });
  };

  let typingTimeout = null;

  const emitTyping = () => {
    clearTimeout(typingTimeout);
    socket.emit('typing', { name, isTyping: true });
    typingTimeout = setTimeout(() => {
      socket.emit('typing', { name, isTyping: false });
    }, 2000);
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <span className="sender">{msg.name}:</span> {msg.text}
            </div>
          ))}
        </div>
        <div className="typing">{typingDisplay}</div>
        {/* <hr /> */}
        <div className="message-input">
          <form onSubmit={sendMessage}>
            <input
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
                emitTyping();
              }}
              className="input-field"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
