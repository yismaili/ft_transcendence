"use client";
import { color } from "framer-motion";
import "./Enable__2FA.css";
import { useState } from "react";
import handleChange from "@/lib/util";
interface twofa {
  qrcode: string;
  state: Function;
  update: Function;
}

export default function Enable2FAPopUP(prop: twofa) {
  const [warning, setWarning] = useState(0);
  const active2fa = async (formData: FormData) => {
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
        "http://localhost:3000/api/updateProfile/2fa/turnOn",
        {
          method: "POST",
          body: JSON.stringify(nums),
        }
      );
      const res = await turnOn.text();
      // console.log(res);
      if (res == '"done"') {
        prop.state(0);
        prop.update(true);
      } else {
        setWarning(1);
        setTimeout(() => {
          setWarning(0);
        }, 5000);
      }
    }
  };

  return (
    <div className="backdrop">
      <div className="enable__2fa">
        <div className="auth__2fa__profile">
          <h3 className="auth__2fa__username"> SCAN THIS:</h3>
          <img src={prop.qrcode} alt="qr code" />
        </div>
        <p className="auth__2fa__msg">enter 6-digit code from your 2fa app</p>
        <form action={active2fa} className="auth__2fa__form" autoComplete="off">
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
        <span className="close__btn" onClick={() => prop.state(0)}></span>
      </div>
    </div>
  );
}
