import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const ChatApp = () => {
  const [socket] = useState(io('http://localhost:3001'));
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [joined, setJoined] = useState(false);
  const [user, setName] = useState('');
  const [secondUser, setSecondUsername] = useState('');
  const [typingDisplay, setTypingDisplay] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editMessageText, setEditMessageText] = useState('');

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
                getMessage();
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

export default ChatApp;
