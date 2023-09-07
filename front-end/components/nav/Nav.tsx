"use client";
import Image from "next/image";
import { Link } from "react-scroll";
import Style from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={Style.container}>
      <Link to="section1" style={{ cursor: "pointer" }} smooth={true}>
        <div className={Style.imageRes}>
          <Image
            quality={100}
            className={Style.imageRes}
            width={75}
            height={75}
            src="/logo.png"
            alt="logo for pong game"
            priority={true}
          />
          <h1 className={Style.title}>PONG</h1>
        </div>
      </Link>
      <div className={Style.links}>
        <Link
          id="link1"
          to="section1"
          style={{ cursor: "pointer" }}
          smooth={true}
        >
          home
        </Link>
        <Link
          id="link2"
          to="section2"
          style={{ cursor: "pointer" }}
          smooth={true}
        >
          about us
        </Link>
        <Link
          id="link4"
          to="section4"
          style={{ cursor: "pointer" }}
          smooth={true}
        >
          faq
        </Link>
        <Link to="" style={{ cursor: "pointer" }}>
          Sign up
        </Link>
      </div>
      <div className={Style.bar}></div>
    </div>
  );
}
