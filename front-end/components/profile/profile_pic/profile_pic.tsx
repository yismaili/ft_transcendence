"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./profile_pic.css";
import Link from "next/link";

interface nums {
  user: User;
  param: boolean;
}

function ProfilePic(props: nums) {
  //console.log("tacos:",props.user)
  return (
    <div className="profile">
      <div className="profile__pic__level">
        {props.param &&<Link href={`/users/${props.user.data.username}/Parameters`} className="params__btn">
          <span className="param__img"></span>
        </Link>}

        <div className="test">
          <span
            className="profile__pic"
            style={{ backgroundImage: `url(${props.user.data.picture})` }}
          ></span>
          <span className="profile__level">
            {props.user.data.profile.level}
          </span>
        </div>
      </div>
      <h3 className="profile__username">{props.user.data.uniquename}</h3>
    </div>
  );
}

export default ProfilePic;
