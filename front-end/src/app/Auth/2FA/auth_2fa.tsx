'use client'
import React, { useState } from "react";
import "../auth-page-css/auth-page.css"
import "../auth-page-css/auth-2fa.css"
import placeholderAvatar from "../../img/profile.svg"
import Image from "next/image";


function Auth_2fa(){
    return(<>
            <main className="auth__card ">
            <div className="auth__credentials auth__2fa">
                <div className="auth__2fa__profile">
                    <Image src={placeholderAvatar} alt="profile"/>
                    <h3 className="auth__2fa__username"> username</h3>
                </div>
                    <p className="auth__2fa__msg">enter 6-digit code from your 2fa app</p>
                    <form action="" className="auth__2fa__form">
                        <div className="auth__2fa__form__inputs">
                        <input type="text" pattern="^[0-9]$" maxLength={1} className="auth__2fa__input"/>
                        <input type="text" pattern="^[0-9]$" maxLength={1} className="auth__2fa__input"/>
                        <input type="text" pattern="^[0-9]$" maxLength={1} className="auth__2fa__input"/>
                        <input type="text" pattern="^[0-9]$" maxLength={1} className="auth__2fa__input"/>
                        <input type="text" pattern="^[0-9]$" maxLength={1} className="auth__2fa__input"/>
                        <input type="text" pattern="^[0-9]$" maxLength={1} className="auth__2fa__input"/>
                        </div>
                        <button className="auth__2fa__form__btn">confirm</button>
                    </form>
            </div>
        </main>
    </>)
}

export default Auth_2fa;