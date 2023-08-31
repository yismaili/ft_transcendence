import React from "react";
import Style from "./Div.module.css";
import Image from "next/image";

type props = {
  leftImg: string;
  rightImg: string;
  title: string;
  text: string;
};

export default function Div(props: props) {
  return (
    <div className={Style.container}>
      <div className={Style.title}>{props.title}</div>
      <div className={Style.leftImage}>
        <div
          className={Style.ImageChild}
          style={{ backgroundImage: `url(${props.leftImg})` }}
        >
          .
        </div>
      </div>
      <div className={Style.text}>
        <p className={Style.textChild}>{props.text}</p>
      </div>
      <div className={Style.rightImage}>
        <div
          className={Style.ImageChild}
          style={{ backgroundImage: `url(${props.rightImg})`, backgroundSize: "clamp(20rem, 35vw, 45rem)" }}
        >
          .
        </div>
      </div>
    </div>
  );
}
