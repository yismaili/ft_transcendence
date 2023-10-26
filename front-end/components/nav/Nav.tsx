"use client";
import Image from "next/image";
import { Link as Scroll_link } from "react-scroll";
import Link from "next/link";
import Style from "./Nav.module.css";
import { useState } from "react";
import Cookies from "cookies-ts";

interface navState {
  num: number;
  seter: Function;
}
export default function Nav(prop: navState) {
  const [phoneNav, setPhoneNav] = useState(false);
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  return (
    <>
      <div className={Style.container}>
        <Scroll_link
          to="section1"
          style={{ cursor: "pointer" }}
          smooth={true}
          onClick={() => prop.seter(0)}
        >
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
            onClick={() => prop.seter(0)}
          >
            home
            {prop.num == 0 && <div className={Style.bar}></div>}
          </Scroll_link>
          <Scroll_link
            id="link2"
            to="section2"
            style={{ cursor: "pointer" }}
            smooth={true}
            onClick={() => prop.seter(1)}
          >
            about us
            {prop.num == 1 && <div className={Style.bar}></div>}
          </Scroll_link>
          <Scroll_link
            id="link4"
            to="section4"
            style={{ cursor: "pointer" }}
            smooth={true}
            className={Style.ok}
            onClick={() => prop.seter(2)}
          >
            faq
            {prop.num == 2 && <div className={Style.bar}></div>}
          </Scroll_link>
          <Link href={Data ? `/users/${Data.response.user.username}` : `/login`} style={{ cursor: "pointer" }}>
            Sign up
          </Link>
        </div>
        <div className={Style.phoneNav}>
          {!phoneNav && (
            <span
              className={Style.openNavIcon}
              onClick={() => setPhoneNav(true)}
            ></span>
          )}
          {phoneNav && (
            <span
              className={Style.closeNav}
              onClick={() => setPhoneNav(false)}
            ></span>
          )}
        </div>
        {phoneNav && (
          <div className={Style.phoneLinks}>
            <Scroll_link
              id="link1"
              to="section1"
              style={{ cursor: "pointer" }}
              smooth={true}
              onClick={() => prop.seter(0)}
            >
              home
            </Scroll_link>
            <Scroll_link
              id="link2"
              to="section2"
              style={{ cursor: "pointer" }}
              smooth={true}
              onClick={() => prop.seter(1)}
            >
              about us
            </Scroll_link>
            <Scroll_link
              id="link4"
              to="section4"
              style={{ cursor: "pointer" }}
              smooth={true}
              className={Style.ok}
              onClick={() => prop.seter(2)}
            >
              faq
            </Scroll_link>
            <Link
              href={Data ? `/users/${Data.response.user.username}` : `/login`}
              style={{ cursor: "pointer" }}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
