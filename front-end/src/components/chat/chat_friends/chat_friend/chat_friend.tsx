import Image from "next/image";
import "./chat_friend.css";

interface amigos {
  friend: Friend;
}
export default function ChatFriend(props: amigos) {
  return (
    <div className="chat__friend">
      <div className="chat__friend__identity">
        <span
          className="friend__pic"
          style={{ backgroundImage: `url(${props.friend.user.picture})` }}
        ></span>
        <h3>{props.friend.user.username}</h3>
      </div>
      <Image
        src="/img/Vector.png"
        alt="options"
        width={10}
        height={40}
        className="chat__friend__options"
      />
    </div>
  );
}
