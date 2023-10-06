import Image from "next/image";
import { useEffect } from "react";
import { Link } from "react-scroll";
import Style from "./Section2.module.css";

export default function Section2() {
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const isDown = e.deltaY > 0;

      if (isDown) {
        if (window.scrollY > -1) {
          document.getElementById("link3")?.click();
        }
      } else {
        document.getElementById("link1")?.click();
      }
    };

    document
      .getElementById("section2")
      ?.addEventListener("wheel", handleScroll);

    return () =>
      document
        .getElementById("section2")
        ?.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <section className={Style.container} id="section2">
      {/* this Link is hidden it's just for smoth scrolling */}
      <Link id="link3" to="section3" smooth={true}></Link>
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
