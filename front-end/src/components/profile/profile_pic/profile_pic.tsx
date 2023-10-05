import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./profile_pic.css";
import Image from "next/image";
import Link from "next/link";

interface nums {
  user: User;
}

function ProfilePic(props: nums) {
  return (
    <div className="profile">
      <div className="profile__pic__level">
        <Link href="/UserProfile/Parameters" className="params__btn">
          <span className="param__img"></span>
        </Link>

        <div className="test">
          <span
            className="profile__pic"
            style={{ backgroundImage: `url(${props.user.picture})` }}
          ></span>
          <span className="profile__level">{props.user.profile.level}</span>
        </div>
      </div>
      <h3 className="profile__username">{props.user.username}</h3>
    </div>
  );
}

export default ProfilePic;
