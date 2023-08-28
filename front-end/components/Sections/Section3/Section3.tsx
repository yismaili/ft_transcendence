"use client";
import { useState } from "react";
import AboutUs from "./AboutUs/AboutUs";
import Style from "./Section3.module.css";
import PopUp from "./AboutUs/PopUp/PopUp";

export default function Section3() {
  const [isClick, setClick] = useState("");

  function openPopUp(name: string) {
    setClick(name);
  }

  function closePopUp() {
    setClick("");
  }

  return (
    <section className={Style.container}>
      <AboutUs
        src="/img/section3/amine_black.png"
        name="El Amine El Mountassir"
        title="Front End Dev"
        set={openPopUp}
      />
      <AboutUs
        src="/img/section3/alouane04_black.png"
        name="Ali Achraf Riahi"
        title="Front End Dev"
        set={openPopUp}
      />
      <AboutUs
        src="/img/section3/dexter.png"
        name="Younes Ismaili"
        title="Back End Dev"
        set={openPopUp}
      />
      {isClick === "El Amine El Mountassir" && (
        <PopUp
          src="/img/section3/amine_white.png"
          name="El Amine El Mountassir"
          title="Front End Dev"
          set={closePopUp}
        />
      )}
      {isClick === "Ali Achraf Riahi" && (
        <PopUp
          src="/img/section3/amine_white.png"
          name="El Amine El Mountassir"
          title="Front End Dev"
          set={closePopUp}
        />
      )}
      {isClick === "Younes Ismaili" && (
        <PopUp
          src="/img/section3/amine_white.png"
          name="El Amine El Mountassir"
          title="Front End Dev"
          set={closePopUp}
        />
      )}
      <div>
        <div className={Style.scrollElm}></div>
        <div className={Style.scrollElm}></div>
      </div>
    </section>
  );
}
