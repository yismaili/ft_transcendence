"use client";
import "./game_maps.css";
import "@/global_css/utilityClasses.css";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSocketContext } from "@/contexts/socket-context";
import MatchMaking from "@/components/MatchMaking/MatchMaking";
import Link from "next/link";

export default function GameMaps() {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("DEFAULT GROUND");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [Images, setImage] = useState({
    leftImage: "/img/gameMap/oceanMap.png",
    centerImage: "/img/gameMap/defaultMap.png",
    rightImage: "/img/gameMap/spaceMap.png",
  });
  const [color, setColor] = useState({
    leftColor: "#2D44B4",
    centerColor: "#000000",
    rightColor: "#4C2DA4",
  });
  const [data, setData] = useState<any>();

  const type = searchParams.get("type");

  useEffect(() => {
    gameSocket.on("players", (response: any) => {
      setData(response);
    });

    if (data)
      setTimeout(() => {
        router.push(`game?map=${title.split(" ")[0]}`);
      }, 3000);
  }, [data]);

  const joinGame = () => {
    setOpen(true);
    if (type && type.split("-")[0] === "invite")
      gameSocket.emit("inviteFriend", {
        username: Data.response.user.username,
        friendUsername: type.split("-")[1],
      });
    else if (type && type.split("-")[0] === "accept") {
      gameSocket.emit("acceptrequest", {
        username: Data.response.user.username,
        userCompetitor: type.split("-")[1],
      });
      setTimeout(() => {
        router.push(`game?map=${title.split(" ")[0]}`);
      }, 3000);
    } else
      gameSocket.emit("createGame", { username: Data.response.user.username });

    gameSocket.on("acceptrequest", (response: { sender: User_Friend }) => {
      setTimeout(() => {
        router.push(`game?map=${title.split(" ")[0]}`);
      }, 3000);
    });
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
      if (Images.leftImage == "/img/gameMap/oceanMap.png") {
        setTitle("BEACH GROUND");
      } else if (Images.leftImage == "/img/gameMap/defaultMap.png") {
        setTitle("DEFAULT GROUND");
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
      if (Images.rightImage == "/img/gameMap/oceanMap.png") {
        setTitle("BEACH GROUND");
      } else if (Images.rightImage == "/img/fgameMap/defaultMap.png") {
        setTitle("DEFAULT GROUND");
      } else {
        setTitle("SPACE GROUND");
      }
    }
  }

  return (
    <>
      <Link href={`/users/${Data.response.user.username}`}>
        <div className="back__btn">
          <span className="back__arrow"></span> <span>back to Profile</span>
        </div>
      </Link>
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
            onClick={joinGame}
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
          <span
            className="rightSwipe bg__image__util"
            onClick={() => swap("right")}
          ></span>
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
      {open && <MatchMaking setOpen={setOpen} data={data} setData={setData} />}
    </>
  );
}
