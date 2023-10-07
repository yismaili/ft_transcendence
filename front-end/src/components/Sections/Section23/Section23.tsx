import { useState, useEffect } from "react";
import Style from "./Section23.module.css";
import Section2 from "../Section2/Section2";
import Section3 from "../Section3/Section3";
import { Link } from "react-scroll";

export default function Section23() {
  const [sec, setSection] = useState(1);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const isDown = e.deltaY > 0;
      let test = 1;
      if (isDown) {
        if (window.scrollY > -1 && sec == 1) {
          setSection(2);
        } else {
          document.getElementById("link4")?.click();
        }
      } else {
        if (sec == 2) {
          setSection(1);
        } else document.getElementById("link1")?.click();
      }
    };

    document
      .getElementById("section2")
      ?.addEventListener("wheel", handleScroll);

    return () =>
      document
        .getElementById("section2")
        ?.removeEventListener("wheel", handleScroll);
  }, [sec]);

  return (
    <section className={Style.AboutUs} id="section2">
      <Link id="link4" to="section4" smooth={true}></Link>
      <div className={Style.scrollBar}>
        <div
          className={`${Style.scrollElm} ${sec == 1 && `${Style.white}`}`}
          onClick={() => setSection(1)}
        ></div>
        <div
          className={`${Style.scrollElm} ${sec == 2 && `${Style.white}`}`}
          onClick={() => setSection(2)}
        ></div>
      </div>
      <Section2 sect={sec} />
      <Section3 sect={sec} />
    </section>
  );
}

