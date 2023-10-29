"use client";
import React from "react";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import { useEffect, useState } from "react";
import Auth_2fa from "@/components/auth/auth_2FA/auth_2fa";

function App() {
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
  }, []);
  return test && <Auth_2fa />;
}

export default App;
