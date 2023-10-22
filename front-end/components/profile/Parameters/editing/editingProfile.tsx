"use client";
import PicEdit from "@/components/profile/Parameters/profile_pic_edit/pic_edit";
import ProfileEdit from "@/components/profile/Parameters/username_2fa/Profile_edit";
import Logout from "@/components/profile/Parameters/logout/logout";
import "./editingProfile.css";
import Enable2FAPopUP from "@/components/profile/Parameters/2FA_popup/enable/Enable__2FA";
import { useState } from "react";
import Disable2FAPopUP from "@/components/profile/Parameters/2FA_popup/disable/disable__2FA";
import "@/styles/global.css";

interface user {
  user: User;
  update: Function;
}

export default function EditProfile(props: user) {
  const [Version, setVersion] = useState(0);
  const [img2fa, setImg2fa] = useState("");
  return (
    <>
      {Version == 0 && (
        <div className="params__container">
          <PicEdit user={props.user} update={props.update} />
          <div className="options__container">
            <ProfileEdit
              user={props.user}
              callBack={setImg2fa}
              state={setVersion}
              update={props.update}
            />
            <Logout />
          </div>
        </div>
      )}
      {Version == 1 && (
        <Enable2FAPopUP
          qrcode={img2fa}
          state={setVersion}
          update={props.update}
        />
      )}
      {Version == 2 && (
        <Disable2FAPopUP state={setVersion} update={props.update} />
      )}
    </>
  );
}
