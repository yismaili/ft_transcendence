import { useEffect, useState } from "react";
import AboutUs from "./AboutUs/AboutUs";
import PopUp from "./AboutUs/PopUp/PopUp";
import Style from "./Section3.module.css";

export default function Section3() {
  //////////// handle smoth scroll //////////////////
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const isDown = e.deltaY > 0;

      if (isDown) {
        if (window.scrollY > -1) {
          document.getElementById("link4")?.click();
        }
      } else {
        document.getElementById("link2")?.click();
      }
    };

    document
      .getElementById("section3")
      ?.addEventListener("wheel", handleScroll);

    return () =>
      document
        .getElementById("section3")
        ?.removeEventListener("wheel", handleScroll);
  }, []);

  ////////////////////////////////

  ///////// handle Music /////////
  const [isClick, setClick] = useState("");

  function openPopUp(name: string) {
    setClick(name);
  }

  function closePopUp() {
    setClick("");
  }

  ///////////////////////////////

  return (
    <section className={Style.container} id="section3">
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
          about="I'm a passionate front-end developer with a strong IT foundation, dedicated to crafting impressive user experiences through creativity and technical expertise."
          url="https://www.linkedin.com/in/eel-moun"
          music={"img/section3/alouane04.mp3"}
        />
      )}
      {isClick === "Ali Achraf Riahi" && (
        <PopUp
          src="/img/section3/alouane04_white.png"
          name="Ali Achraf Riahi"
          title="Front End Dev"
          set={closePopUp}
          about="A passionate front-end dev, Currently a student at 1337, honing my skills in responsive design and exploring modern frameworks(React.js/Next.js).Staying updated"
          url="https://www.linkedin.com/in/alouane04"
          music={"img/section3/alouane04.mp3"}
        />
      )}
      {isClick === "Younes Ismaili" && (
        <PopUp
          src="/img/section3/dexter.png"
          name="Younes Ismaili"
          title="Back End Dev"
          set={closePopUp}
          about="I'm a student at @1337FIL, and I'm really passionate about DevOps | Cybersecurity."
          url="https://www.linkedin.com/in/yo-ismaili"
          music={"img/section3/alouane04.mp3"}
        />
      )}
      <div>
        <div className={Style.scrollElm}></div>
        <div className={Style.scrollElm}></div>
      </div>
    </section>
  );
}
