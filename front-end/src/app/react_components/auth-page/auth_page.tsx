'use client'
import React from "react";
import "../../css_files/components/auth-page-css/auth-page.css"
import { useRouter } from "next/navigation";
import axios from "axios";




function AuthSection(){
    const router = useRouter();

    const redir_page = async (url:string) => {
        let auth_window = window.open(url, "", "width=600,height=400,top=200,left=300");

        if(auth_window != null)
        {
            
            setInterval(() => {
            let container = auth_window?.document.querySelector("prev");
            console.log(10);
            }, 1000);
        }
    }

    return (<>
        <main className="auth__card">
            <div className="auth__credentials">
                    <h1 className="auth__msg"> begin your journey</h1>
                    <button type="submit" className="auth__btn" onClick={() => redir_page("http://localhost:3001/auth/google/callback")}> login with google</button>
                    <button className="auth__btn" onClick={() => redir_page("http://localhost:3001/auth/intra/callback")}><strong>42</strong> login with intra </button>
            </div>
            <button onClick={() => {
                axios.get('http://localhost:3001/auth/home').then((response) => {
                    console.log(response)
                }).catch((err) => console.log(err))
            }}>Test</button>
        </main>
    </>);
}
export default AuthSection;