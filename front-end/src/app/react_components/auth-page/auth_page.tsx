'use client'
import React from "react";
import "../../css_files/components/auth-page-css/auth-page.css"
import { useRouter } from "next/navigation";




function AuthSection(){
    const router = useRouter();
    return (<>
        <main className="auth__card">
            <div className="auth__credentials">
                    <h1 className="auth__msg"> begin your journey</h1>
                    <button type="submit" className="auth__btn" onClick={() => router.push("http://localhost:3001/auth/google/callback")}> login with google</button>
                    <button className="auth__btn" onClick={() => router.push("http://localhost:3001/auth/intra/callback")}><strong>42</strong> login with intra </button>
            </div>
        </main>
    </>);
}
export default AuthSection;