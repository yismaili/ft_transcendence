"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./Profile_edit.css";
import Enable2FAPopUP from "@/components/profile/Parameters/2FA_popup/enable/Enable__2FA.jsx";
import { useState } from "react";
import Cookies from "cookies-ts";

interface nums {
  user: User;
  callBack: Function;
  state: Function;
  update: Function;
}

export default function ProfileEdit(props: nums) {
  const [warning, setWarning] = useState(0);
  const cookies = new Cookies();

  const editUsername = async (formData: FormData) => {
    if (formData.get("username")) {
      const username = formData.get("username");
      // console.log("test01:", username);
      const sending = await fetch(
        "http://localhost:3000/api/updateProfile/username",
        {
          method: "POST",
          body: JSON.stringify(username),
        }
      );
      const val = await sending.json();
      if (val == "done") {
        //console.log("cook", cookies.get("userData"));
        const cookie = cookies.get("userData");
        if (cookie) {
          var data = JSON.parse(JSON.stringify(cookie));
          data.response.user.uniquename = username;
          cookies.set("userData", data);
        }

        props.update(true);
      } else {
        setWarning(1);
        setTimeout(() => {
          setWarning(0);
        }, 5000);
      }
    }
  };

  const managing_2fa = async (formData: FormData) => {
    if (formData.get("2fa")?.toString() == "enable") {
      // console.log("test002");
      const generating = await fetch(
        "http://localhost:3000/api/updateProfile/2fa/generating",
        {
          method: "POST",
        }
      );
      const val = await generating.json();
      props.callBack(val.img);
      props.state(1);
    } else if (formData.get("2fa")?.toString() == "disable") {
      props.state(2);
    }
  };
  return (
    <>
      <form action={editUsername} className="form">
        <div>
          <label htmlFor="username" className="form__label">
            USERNAME
          </label>
          <input
            type="text"
            placeholder={`${props.user.data.uniquename}`}
            id="username"
            name="username"
            className="input__username"
            minLength={1}
            maxLength={10}
          />
        </div>
        <input type="submit" value="Edit" className="edit__btn" />
      </form>
      {warning === 1 && (
        <p style={{ color: "red" }}>couldn't change username.</p>
      )}
      <form action={managing_2fa} className="form">
        <div>
          <label htmlFor="2FA" className="form__label">
            2FA
          </label>
          <select id="2FA" name="2fa" size={1} className="hide">
            {!props.user.data.isTwoFactorAuthEnabled && (
              <option value="enable">Enabled</option>
            )}
            {props.user.data.isTwoFactorAuthEnabled && (
              <option value="disable">Disabled</option>
            )}
          </select>
        </div>
        <input
          type="submit"
          value={props.user.data.isTwoFactorAuthEnabled ? "disable" : "enable"}
          className="edit__btn"
        />
      </form>
    </>
  );
}
