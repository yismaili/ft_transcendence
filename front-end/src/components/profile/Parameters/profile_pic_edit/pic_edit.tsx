import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./pic_edit.css"
import React from "react";

interface nums {
  user: User;
}

export default function PicEdit(props: nums) {
  return (
    <div className="Params__pic">
      <span
        className="Params__profile__pic"
        style={{ backgroundImage: `url(${props.user.picture})` }}
      > <span className="pic__edit__btn">
        </span>
      </span>
    </div>
  );
}
