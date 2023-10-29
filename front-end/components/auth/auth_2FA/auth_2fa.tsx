"use client";
import "@/components/auth/auth_page/auth-page.css";
import "./auth-2fa.css";
import Cookies from "cookies-ts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/global.css";
import { useState } from "react";
import handleChange from "@/lib/util";

function Auth_2fa() {
  const cookie = new Cookies();
  const router = useRouter();
  const cookieval = cookie.get("userData");
  const [warning, setWarning] = useState(0);

  let data: any;
  if (cookieval) data = JSON.parse(JSON.stringify(cookieval));

  const Authenticate = async (formData: FormData) => {
    let nums = new String("");
    let num1: string | undefined = formData.get("1")?.toString();
    let num2: string | undefined = formData.get("2")?.toString();
    let num3: string | undefined = formData.get("3")?.toString();
    let num4: string | undefined = formData.get("4")?.toString();
    let num5: string | undefined = formData.get("5")?.toString();
    let num6: string | undefined = formData.get("6")?.toString();
    if (num1 && num2 && num3 && num4 && num5 && num6) {
      nums = nums.concat(num1, num2, num3, num4, num5, num6);

      const turnOn = await fetch(
        "http://localhost:3000/api/updateProfile/2fa/authenticate",
        {
          method: "POST",
          body: JSON.stringify({
            code: nums,
            username: data.response.user.username,
          }),
        }
      );

      let val = await turnOn.text();
      // console.log("test45:", val);
      if (val != '"false"') {
        cookie.set("userData", val);
        router.push(
          `http://localhost:3000/users/${data.response.user.username}`
        );
      } else {
        setWarning(1);
        setTimeout(() => {
          setWarning(0);
        }, 5000);
      }
    }
  };

  return (
    <>
      <main className="auth__card ">
        <div className="auth__credentials auth__2fa">
          <div className="auth__2fa__profile">
            <span
              className="auth__2fa__img"
              style={{ backgroundImage: `url(${data.response.user.picture})` }}
            ></span>
            <h3 className="auth__2fa__username">
              {" "}
              {data.response.user.uniquename}
            </h3>
          </div>
          <p className="auth__2fa__msg">enter 6-digit code from your 2fa app</p>
          <form
            action={Authenticate}
            className="auth__2fa__form"
            autoComplete="off"
          >
            <div className="auth__2fa__form__inputs" id="login__2fa">
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="1"
                id="1"
                required
                onChange={(e) => handleChange(e, "2")}
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="2"
                onChange={(e) => handleChange(e, "3")}
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="3"
                onChange={(e) => handleChange(e, "4")}
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="4"
                onChange={(e) => handleChange(e, "5")}
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="5"
                onChange={(e) => handleChange(e, "6")}
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="6"
                required
              />
            </div>
            <button className="auth__2fa__form__btn">confirm</button>
          </form>
          {warning === 1 && <p style={{ color: "red" }}>Wrong 2FA Code</p>}
        </div>
      </main>
    </>
  );
}

export default Auth_2fa;
