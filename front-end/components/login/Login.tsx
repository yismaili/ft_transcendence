"use client";
import { useState } from "react";
import Style from "./Login.module.css";
import Sign_up_in from "./sign_up_in/Sign_up_in";

export default function Login() {
  const [sign_up, setSign_up] = useState(true);

  const handleSign_up = (is_sign_up: boolean) => {
    setSign_up(is_sign_up);
  };

  return (
    <main className={Style.container}>
      <div className={Style.leftDiv}>
        <div className={Style.imageDiv}></div>
      </div>
      <div className={Style.rightDiv}>
        <div className={Style.text}>
          <h1>Happening now</h1>
          <p className={Style.firstP}>Join today.</p>
        </div>
        {sign_up ? (
          <Sign_up_in Sign_in_up="Sign up" onData={handleSign_up} />
        ) : (
          <Sign_up_in Sign_in_up="Sign in" onData={handleSign_up} />
        )}
      </div>
    </main>
  );
}
