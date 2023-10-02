import { useRef, useState } from "react";
import "./FriendRequest.css";
import Image from "next/image";

export default function FriendRequest() {
  const ref = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(0);

  const active = async (formData: FormData) => {
    ref.current?.reset();

    const content = formData.get("friendName");
    console.log(content);
    const sending = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify(content),
    })
      .then(async (res) => await res.json())
      .then((e) => {
        if (e === "doesn't exist") setSent(2);
        else setSent(1);
      })
      .catch(() => setSent(2));

    setTimeout(() => {
      setSent(0);
    }, 5000);
  };

  return (
    <div className="chatroom__sidebar__addbar">
      <form
        ref={ref}
        action={active}
        className="chatroom__sidebar__addbar__form"
      >
        <input
          autoComplete="off"
          type="text"
          className="add__bar"
          id="addbar"
          maxLength={15}
          name="friendName"
        />
        <label htmlFor="addbar" className="add__btn">
          <Image
            src="/img/chat/add.png"
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
      {sent == 1 && (
        <>
          <p>kayn</p>
        </>
      )}
      {sent == 2 && (
        <>
          <p>makaynch</p>
        </>
      )}
    </div>
  );
}
