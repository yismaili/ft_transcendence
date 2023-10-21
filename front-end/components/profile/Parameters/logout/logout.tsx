"use client"
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./logout.css"
import Cookies from "cookies-ts"
import { useRouter } from "next/navigation";

export default function Logout() {
    const cookies = new Cookies();
    const router = useRouter();
    
    const logout = () => {
        cookies.remove('userData');
        router.push("http://localhost:3000/login");
    }
    
    return (<>
        <button className="logout__btn" onClick={logout}>Logout</button>
    </>);
}