import React from 'react';
import "./css_files/resets.css";
import "./css_files/utilityClasses.css";
import Auth_2fa from './react_components/auth-page/auth_2fa';
function App() {
  return (<div className='container'>
    <Auth_2fa />
  </div>
  );
}

export default App;
