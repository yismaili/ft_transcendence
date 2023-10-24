"use client";
import { useEffect, useState } from "react";
import Style from "./Login.module.css";
import Sign_up_in from "./sign_up_in/Sign_up_in";
import Cookies from "cookies-ts";
import { useRouter } from "next/navigation";

export default function Login() {
  const [sign_up, setSign_up] = useState(true);
  const router = useRouter();

  const handleSign_up = (is_sign_up: boolean) => {
    setSign_up(is_sign_up);
  };
  
  useEffect(() => {
    const checkToken = () => {
      const cookies = new Cookies();
      const mycookie = cookies.get("userData");
      if(mycookie)
      {
        let cookieval = JSON.parse(JSON.stringify(mycookie));
        if(cookieval.response.token)
        {
          router.push(`http://localhost:3000/users/${cookieval.response.user.username}`);
        }
      }
    }
  
    checkToken();
  })

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
