"use client";
import AboutUs from "./AboutUs/AboutUs";
import Style from "./Section3.module.css";

export default function Section3() {
  return (
    <section className={Style.container}>
      <AboutUs
        src="/img/section3/amine_black.jpeg"
        name="El Amine El Mountassir"
        title="Front End Dev"
      />
      <AboutUs
        src="/img/section3/test.jpeg"
        name="Ali Achraf Riahi"
        title="Front End Dev"
      />
      <AboutUs
        src="/img/section3/dexter.png"
        name="Younes Ismaili"
        title="Back End Dev"
      />
      <div>
        <div className={Style.scrollElm}></div>
        <div className={Style.scrollElm}></div>
      </div>
    </section>
  );
}
