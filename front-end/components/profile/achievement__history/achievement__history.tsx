"use client";
import Achievements from "@/components/profile/achievements/achievements";
import History from "@/components/profile/history/history";
import "./achievement__history.css";
import { useState } from "react";

export default function History__Achievements() {
  const [achivment, setAchivement] = useState(true);
  return (
    <div className="achievements__history">
      <Achievements isDisplay={achivment} />
      <History isDisplay={achivment} />
      <span
        className="achievements__history__Scroll"
        onClick={() => setAchivement((prev) => !prev)}
      ></span>
    </div>
  );
}
