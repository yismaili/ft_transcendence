import React, { useEffect, useState } from "react";
import Style from "./Div.module.css";
import { motion, useAnimation, useScroll, useSpring } from "framer-motion";

type props = {
  leftImg: string;
  rightImg: string;
  title: string;
  text: string;
  y: any;
  opacity: any;
};

export default function Div(props: props) {
  return (
    <motion.div
      className={Style.container}
      style={{ y: props.y, opacity: props.opacity }}
    >
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
          style={{
            backgroundImage: `url(${props.rightImg})`,
            backgroundSize: "clamp(20rem, 33vw, 42rem)",
          }}
        >
          .
        </div>
      </div>
    </motion.div>
  );
}
