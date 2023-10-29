"use client";
import Achievements from "@/components/profile/achievements/achievements";
import History from "@/components/profile/history/history";
import "./achievement__history.css";
import { useEffect, useState } from "react";

interface name{
  ownerName: string;
  user: User;
}
export default function History__Achievements(prop : name) {
  const [achivment, setAchivement] = useState(true);

  return (
    <div className="achievements__history">
      <Achievements isDisplay={achivment} user={prop.user}/>
      <History isDisplay={achivment} ownerName={prop.ownerName} />
      <span
        className="achievements__history__Scroll"
        onClick={() => setAchivement((prev) => !prev)}
      ></span>
    </div>
  );
}
