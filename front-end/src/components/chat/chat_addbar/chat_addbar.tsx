"use client";
import React, { useRef } from "react";
import "./chat-addbar.css";
import Image from "next/image";

function ChatAddBar() {
  const ref = useRef<HTMLFormElement>(null);
  //   const addUser = async (formData: FormData) => {
  //     "use server";
  //     const content = formData.get("friendName");
  //     console.log(content);
  //   };

  return (
    <div className="chatroom__sidebar__addbar">
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();
          const content = formData.get("friendName");
          console.log(content);
        }}
        className="chatroom__sidebar__addbar__form"
      >
        <input
          type="text"
          className="add__bar"
          id="addbar"
          maxLength={15}
          name="friendName"
        />
        <label htmlFor="addbar" className="add__btn">
          <Image
            src="/img/add.png"
            height={40}
            width={40}
            alt=""
            className="add__icon"
            onClick={() => {
              ref.current?.reset();
            }}
          />
        </label>
      </form>
    </div>
  );
}

export default ChatAddBar;
