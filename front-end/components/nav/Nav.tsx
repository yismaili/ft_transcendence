"use client";
import Image from "next/image";
import { Link as Scroll_link } from "react-scroll";
import Link from "next/link";
import Style from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={Style.container}>
      <Scroll_link to="section1" style={{ cursor: "pointer" }} smooth={true}>
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
      </Scroll_link>
      <div className={Style.links}>
        <Scroll_link
          id="link1"
          to="section1"
          style={{ cursor: "pointer" }}
          smooth={true}
        >
          home
        </Scroll_link>
        <Scroll_link
          id="link2"
          to="section2"
          style={{ cursor: "pointer" }}
          smooth={true}
        >
          about us
        </Scroll_link>
        <Scroll_link
          id="link4"
          to="section4"
          style={{ cursor: "pointer" }}
          smooth={true}
        >
          faq
        </Scroll_link>
        <Link href="/login" style={{ cursor: "pointer" }}>
          Sign up
        </Link>
      </div>
      <div className={Style.bar}></div>
    </div>
  );
}
