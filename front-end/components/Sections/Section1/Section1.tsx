import Image from "next/image";
import Style from "./Section1.module.css";
import { useEffect } from "react";
import "@/global_css/utilityClasses.css";
import Link from "next/link";
import Cookies from "cookies-ts";

export default function Section1() {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

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
        <Link href={Data ? `/users/${Data.response.user.username}` : `/login`}>
          <button>PLAY NOW</button>
        </Link>
      </div>
      <div className={Style.MainImg}>
        <span className={Style.ball}></span>
        <span className={Style.Moon}></span>
      </div>
    </section>
  );
}
