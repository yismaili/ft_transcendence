"use client";
import Nav from "@/components/nav/Nav";
import Main from "@/components/main/Main";
import "@/styles/global.css";
import { useEffect, useState } from "react";
import DefError from "./error";

export default function Home() {
  const [section, setSection] = useState(0);
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
    window.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  }, []);

  return (
    test && (
      <div className="container">
        <Nav num={section} seter={setSection} />
        <Main />
      </div>
    )
  );
}
