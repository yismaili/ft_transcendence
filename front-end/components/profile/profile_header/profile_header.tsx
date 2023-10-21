"use client"
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./App-header.css";
import Link from "next/link";

interface userN{
  path:string
}
export default function ProfileHeader(prop : userN){
  return (<>
    <header className="app__header">
            <Link className="app__header__chat opac" href="/chat">chatroom</Link>
            <Link className="app__header__profile" href={`/UserProfile/${prop.path}`}>profile</Link>
    </header>
  </>);
}