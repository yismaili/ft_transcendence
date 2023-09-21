import Image from "next/image";
import "./chat_friend.css"

export default function ChatFriend() {
    return (<div className="chat__friend">
    <div className="chat__friend__identity">
        <Image src="/img/friend_avatar.png" width={80} height={80} className="avatar" alt="profile__pic"/>
        <h3>khalid mn fes</h3>
    </div>
    <Image src="/img/Vector.png" alt="options" width={10} height={40} className="chat__friend__options" />
</div>);
 }