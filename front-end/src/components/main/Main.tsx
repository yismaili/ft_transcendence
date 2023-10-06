"use client";
import Section1 from "../Sections/Section1/Section1";
import Section2 from "../Sections/Section2/Section2";
import Section3 from "../Sections/Section3/Section3";
import Section4 from "../Sections/Section4/Section4";
import Style from "./Main.module.css";

export default function Main() {
  return (
    <main>
      <Section1 />
      <div className="test23">
        <div className="scrollBar">
          <div className={Style.scrollElm}></div>
          <div className={Style.scrollElm}></div>
        </div>
        <Section2 />
        <Section3 />
      </div>
      {/* <Section4 /> */}
    </main>
  );
}
