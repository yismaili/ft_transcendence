"use client";
import { url } from "inspector";
import "./game_maps.css";
import "@/global_css/utilityClasses.css";
import { useState } from "react";

export default function GameMaps() {
  const [Images, setImage] = useState({
    leftImage: "/img/oceanMap.png",
    centerImage: "/img/footballMap.png",
    rightImage: "/img/spaceMap.png",
  });
  
  const [title, setTitle] = useState("FOOT GROUND");
  
  const [color, setColor] = useState({
    leftColor: "#2D44B4",
    centerColor: "#A1CA53",
    rightColor: "#4C2DA4",
  });

  const joinGame = () => {

  };

  function swap(position: string) {
    if (position == "left") {
      setImage({
        leftImage: Images.centerImage,
        centerImage: Images.leftImage,
        rightImage: Images.rightImage,
      });
      setColor({
        leftColor: color.centerColor,
        centerColor: color.leftColor,
        rightColor: color.rightColor,
      });
      if (Images.leftImage == "/img/oceanMap.png") {
        setTitle("BEACH GROUND");
      } else if (Images.leftImage == "/img/footballMap.png") {
        setTitle("FOOT GROUND");
      } else {
        setTitle("SPACE GROUND");
      }
    } else {
      setImage({
        leftImage: Images.leftImage,
        centerImage: Images.rightImage,
        rightImage: Images.centerImage,
      });
      setColor({
        leftColor: color.leftColor,
        centerColor: color.rightColor,
        rightColor: color.centerColor,
      });
      if (Images.rightImage == "/img/oceanMap.png") {
        setTitle("BEACH GROUND");
      } else if (Images.rightImage == "/img/footballMap.png") {
        setTitle("FOOT GROUND");
      } else {
        setTitle("SPACE GROUND");
      }
    }
  }

  return (
    <>
      <div className="Game__maps">
        <div className="Game__maps__centering">
          <span
            className="leftSwipe bg__image__util"
            onClick={() => swap("left")}
          ></span>
          <span
            className="Game__maps__left__map bg__image__util cursor"
            style={{ backgroundImage: `url(${Images.leftImage})` }}
            onClick={() => swap("left")}
          ></span>
          <div
            key={Math.random()}
            className=" Game__maps__center cursor"
            onClick={() => {joinGame}}
          >
            {/* hna l function dial selection dial lmap*/}
            <span
              className="Game__maps__center__map bg__image__util"
              style={{ backgroundImage: `url(${Images.centerImage})` }}
            ></span>
            <span
              className="center__map__blur bg__image__util "
              style={{ backgroundImage: `url(${Images.centerImage})` }}
            ></span>
          </div>
          <span
            className="Game__maps__right__map bg__image__util cursor "
            style={{ backgroundImage: `url(${Images.rightImage})` }}
            onClick={() => swap("right")}
          ></span>
          <span className="rightSwipe bg__image__util" onClick={() => swap("right")}></span>
        </div>
      </div>
      <div className="Game__mapName">
        <h1>{title}</h1>
      </div>
      <div className="choice">
        <div className="line">
          <div
            className="circle center__circle"
            style={{ backgroundColor: `${color.centerColor}` }}
          ></div>
          <div
            className="circle border"
            style={{ borderBlockColor: `${color.centerColor}` }}
          ></div>
          <div
            className="circle left__circle"
            style={{ backgroundColor: `${color.leftColor}` }}
            onClick={() => swap("left")}
          ></div>
          <div
            className="circle right__circle"
            style={{ backgroundColor: `${color.rightColor}` }}
            onClick={() => swap("right")}
          ></div>
        </div>
      </div>
    </>
  );
}
