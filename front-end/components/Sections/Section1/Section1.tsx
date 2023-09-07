import Image from "next/image";
import Style from "./Section1.module.css";
import { useEffect } from "react";

export default function Section1() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > -1) {
        document.getElementById("link2")?.click();
      }
    };

    document
      .getElementById("section1")
      ?.addEventListener("wheel", handleScroll);

    return () =>
      document
        .getElementById("section1")
        ?.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <section id="section1" className={Style.container}>
      <div className={Style.Main}>
        <h1 className={Style.title}>
          FUTURE OF <span>PONG</span> START NOW
        </h1>
        <button>PLAY NOW</button>
      </div>
      <div className={Style.MainImg}>
        <div className={Style.side__icons}>
          <Image
            src="/img/section1/ball.png"
            alt="a ping ball image"
            width={100}
            height={100}
            priority={true}
            quality={100}
            className={Style.side__icons__btn__icon}
          />
        </div>
        <div className={Style.side__icons}>
          <div className={Style.MoonBall}>
            <Image
              src="/img/section1/moon.png"
              alt="moon image"
              priority={true}
              quality={100}
              width={100}
              height={100}
              className={Style.side__icons__btn__icon}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
