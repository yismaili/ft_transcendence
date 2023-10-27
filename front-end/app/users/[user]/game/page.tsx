"use client";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import "@/global_css/utilityClasses.css";
import Game from "@/components/Game/Game";

export default function page() {
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
  }, []);
  return test && <Game />;
}
