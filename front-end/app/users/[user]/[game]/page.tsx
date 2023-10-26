"use client";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import Game from "@/components/Game/Game";

export default function page({ params }: { params: { game: string } }) {
  const [test, setTest] = useState(false);

  useEffect(() => {
    setTest(true);
  }, []);
  return test && <Game params={params} />;
}
