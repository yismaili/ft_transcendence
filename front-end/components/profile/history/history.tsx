"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./history.css";
import { useEffect, useState } from "react";
import SingleHistory from "../singleHistory/singleHistory";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  isDisplay: boolean;
  ownerName: string;
};

function History({ isDisplay, ownerName }: props) {
  const { Data } = useSocketContext();
  const [hist, sethistory] = useState<history[]>();

  useEffect(() => {
    const fetching = async () => {
      if(ownerName == Data.response.user.username)
      {
        console.log("ana wst l owner");
        const res = await fetch("http://localhost:3000/api/home/history");
        const val = await res.json();
        if (val) {
          sethistory(val.data);
        }
      }else{
        console.log("ana wst l friend");
        const res = await fetch("http://localhost:3000/api/friend/history", {
          method: "POST",
          body: ownerName,
        });
        const val = await res.json();
        if (val) {
          sethistory(val.data);
        }
      }
       
    };
    fetching();
  }, []);

    return (
      <div
        className={`history ${
          !isDisplay ? "show__history" : "noshow__history"
        }`}
      >
        <h3 className="history__title">history</h3>
        {hist && hist.map((pastGame) => {
            if(pastGame.user.username == ownerName)
              return <SingleHistory Player1={pastGame.user} Player2={pastGame.userCompetitor} Player1Score={pastGame.resulteOfUser} Player2Score={pastGame.resulteOfCompetitor}/>;
            else
              return <SingleHistory Player2={pastGame.user} Player1={pastGame.userCompetitor} Player2Score={pastGame.resulteOfUser} Player1Score={pastGame.resulteOfCompetitor}/>;

        })}
      </div>
    );
  }


export default History;
