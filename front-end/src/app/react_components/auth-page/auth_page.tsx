'use client'
import React, { useState } from "react";
import "../../css_files/components/auth-page-css/auth-page.css"



function AuthSection(){

    async function googleAuth() {
        fetch('http://localhost:3001/auth/google/callback')
            .then(response => console.log(response.json()))
            .catch(e => console.log(e));
    }

    return (<>
        <h1>ana amin zaml</h1>
        <main className="auth__card">
            <div className="auth__credentials">
                    <h1 className="auth__msg"> begin your journey</h1>
                    <button type="submit" className="auth__btn" onClick={googleAuth}> login with google</button>
                    <button className="auth__btn"><strong>42</strong> login with intra </button>
            </div>
        </main>
    </>);
}
// ANA AMIN W ANA ZAML HTA LTRF
export default AuthSection;