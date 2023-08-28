'use client'
import React from 'react';
import "../global_css/resets.css";
import "../global_css/utilityClasses.css";
import AppHeader from './App_header';
import { useState } from "react";

function App() {
  const [page, setPage] = useState(true);
  return (<>
  <AppHeader state={setPage} />
  </>);
}

export default App;
