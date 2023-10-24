"use client"
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./App-header.css";
import Link from "next/link";

interface userN{
  user:User,
  path:string
}

export default function ProfileHeader(prop : userN){
  return (<>
    <header className="app__header">
            <Link className="app__header__chat opac" href={`${prop.path}/chat`}>chatrooms</Link>
            <Link className="app__header__profile" href={`/users/${prop.path}`}>profile</Link>
    </header>
  </>);
}