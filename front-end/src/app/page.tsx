import React from 'react';
import "./css_files/resets.css";
import "./css_files/utilityClasses.css";
import AuthSection from './react_components/auth-page/auth_page';
function App() {
  return (<div className='container'>
    <AuthSection />
  </div>
  );
}

export default App;
