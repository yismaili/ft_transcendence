import PicEdit from "@/components/profile/Parameters/profile_pic_edit/pic_edit";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import getUser from "@/lib/getUser";
import { cookies } from "next/headers";
import ProfileEdit from "@/components/profile/Parameters/username_2fa/Profile_edit";
import Logout from "@/components/profile/Parameters/logout/logout";
import "@/components/profile/Parameters/params.css";

export default async function Parametters() {
  const cookie = cookies().get("userData");
  console.log(cookie);
  if (cookie) {
    console.log("test");
    const userData: Promise<User> = getUser(cookie.value);
    const user = await userData;
    return (
      <div className="container">
        <div className="params__container">
          <PicEdit user={user} />
          <div className="options__container">
            <ProfileEdit user={user} />
            <Logout />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
