"use client";
import { useEffect, useState } from "react";
import AboutUs from "../AboutUs/AboutUs";
import "./PhoneAboutUs.css";

type props = {
  set: Function;
};

export default function PhoneAboutUs(prop: props) {
  const [user, setUser] = useState(1);
  const Switch = () => {
    setTimeout(() => {
      if (user == 1) setUser(2);
      else if (user == 2) setUser(3);
      else setUser(1);
    }, 3500);
  };

  Switch();
  return (
    <div className="PhoneAboutUs">
      {user == 1 && (
        <AboutUs
          src="/img/section3/amine_black.png"
          name="El Amine El Mountassir"
          title="Front End Dev"
          set={prop.set}
        />
      )}
      {user == 2 && (
        <AboutUs
          src="/img/section3/alouane04_black.png"
          name="Ali Achraf Riahi"
          title="Front End Dev"
          set={prop.set}
        />
      )}
      {user == 3 && (
        <AboutUs
          src="/img/section3/dexter.png"
          name="Younes Ismaili"
          title="Back End Dev"
          set={prop.set}
        />
      )}
      <div className="circles">
        <span
          className={`circle ${user == 1 && "white"}`}
        ></span>
        <span
          className={`circle ${user == 2 && "white"}`}
        ></span>
        <span
          className={`circle ${user == 3 && "white"}`}
        ></span>
      </div>
    </div>
  );
}
