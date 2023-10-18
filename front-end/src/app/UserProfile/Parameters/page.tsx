"use client"
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "@/components/profile/Parameters/params.css";
import EditProfile from "@/components/profile/Parameters/editing/editingProfile";
import { useState, useEffect } from "react";

export default function Parametters() {
let [user, setUser] = useState<User>();
let [edit, setEdited] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch("http://localhost:3000/api/home");
      const user = await res.json();
      setUser(user);
      setEdited(false);
    };
    fetching();
  }, [edit]);
    if(user)
    {
      return (
      <div className="test__container">
        <EditProfile user={user} update={setEdited}/>
      </div>
      );    
  }
  return <></>;
}
