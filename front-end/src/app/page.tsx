import React from 'react';
import "./css_files/resets.css";
import "./css_files/utilityClasses.css";
import AppHeader from './react_components/App_header';
import ChatRoom from './react_components/chat_room';

function App() {
  return (<div className='container'>
    <AppHeader />
    <ChatRoom />
  </div>
  );
}

export default App;
