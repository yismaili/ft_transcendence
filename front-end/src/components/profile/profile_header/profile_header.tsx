"use client"
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./App-header.css";
import Link from "next/link";

export default function ProfileHeader(){
  return (<>
    <header className="app__header">
        <nav>
            <Link className="app__header__chat opac" href="/Chat">chatroom</Link>
            <Link className="app__header__profile" href="/UserProfile">profile</Link>
        </nav>
    </header>
  </>);
}