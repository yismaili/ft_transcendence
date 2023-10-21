"use client";
import Nav from "@/components/nav/Nav";
import Main from "@/components/main/Main";
import "@/styles/global.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [section, setSection] = useState(0);

  useEffect(() => {
    window.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  }, []);

  return (
    <div className="container">
      <Nav num={section} seter={setSection} />
      <Main />
    </div>
  );
}
