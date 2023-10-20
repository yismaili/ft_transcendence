import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import Style from "./Section2.module.css";

interface index { 
  sect: number;
}
export default function Section2(prop:index) {
  return (
    <section className={`${Style.container} ${prop.sect == 1 ? `${Style.in}` : `${Style.out}`}`} >
      {/* this Link is hidden it's just for smoth scrolling */}
      <div className={Style.friend}>
        <span className={Style.cubeImg}></span>
        <div className={Style.txt}>
          <p>
            We are a team of three student developers who are passionate,
            curious, and hardworking.
            <br />We are always eager to learn new things and love to solve problems.
          </p>
        </div>
      </div>
    </section>
  );
}
