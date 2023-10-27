"use client";
import Achievements from "@/components/profile/achievements/achievements";
import History from "@/components/profile/history/history";
import "./achievement__history.css";
import { useEffect, useState } from "react";

export default function History__Achievements() {
  const [achivment, setAchivement] = useState(true);
  
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch("http://localhost:3000/api/home/history");
      const history = await res.json();
      console.log("history:",history.data[0]);
    }
    fetching();
  });

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
