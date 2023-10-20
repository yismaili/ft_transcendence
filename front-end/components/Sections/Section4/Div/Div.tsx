import React, { useEffect, useState } from "react";
import Style from "./Div.module.css";

type props = {
  leftImg: string;
  rightImg: string;
  text: string;
};

export default function Div(props: props) {
  return (
    <div className={Style.container}>
      <div className={Style.leftImage}>
        <div
          className={Style.ImageChild}
          style={{ backgroundImage: `url(${props.leftImg})` }}
        ></div>
      </div>
      <div className={Style.text}>
        <p className={Style.textChild}>{props.text}</p>
      </div>
      <div className={Style.rightImage}>
        <div
          className={Style.ImageChild}
          style={{
            backgroundImage: `url(${props.rightImg})`,
            backgroundSize: "clamp(20rem, 33vw, 42rem)",
          }}
        ></div>
      </div>
    </div>
  );
}
