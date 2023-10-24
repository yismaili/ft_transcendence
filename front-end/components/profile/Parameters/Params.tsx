import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "@/components/profile/Parameters/params.css";
import EditProfile from "@/components/profile/Parameters/editing/editingProfile";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Params() {
  let [user, setUser] = useState<User>();
  let [edit, setEdited] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch("http://localhost:3000/api/home");
      const user = await res.json();
      setUser(user);
      setEdited(false);
    };
    fetching();
  }, [edit]);
  if (user) {
    return (
      <div className="test__container">
        <EditProfile user={user} update={setEdited} />
        <Link href={`/users/${user.data.username}`}>
          <div className="back__btn">
            <span className="back__arrow"></span> <span>back to Profile</span>
          </div>
        </Link>
      </div>
    );
  }
  return <></>;
}
