import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./profile_pic.css";

interface nums {
  user: User;
}

function ProfilePic(props: nums) {
  return (
    <div className="profile">
      <div className="profile__pic__level">
        <span
          className="profile__pic"
          style={{ backgroundImage: 'url("/img/profileImage.svg")' }}
        ></span>
        <span className="profile__level">{props.user.profile.level}</span>
      </div>
      <h3 className="profile__username">{props.user.username}</h3>
    </div>
  );
}

export default ProfilePic;
