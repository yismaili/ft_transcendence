"use client";
import "@/components/auth/auth_page/auth-page.css";
import "./auth-2fa.css";
import Cookies  from "cookies-ts";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Auth_2fa() {
  const cookie = new Cookies();
  const router = useRouter()
  const cookieval = cookie.get("userData");
  let data:any;
  if(cookieval)
    data = JSON.parse(JSON.stringify(cookieval));
  console.log(data);

  const Authenticate = async (formData: FormData) => {
    let nums = new String("");
    let num1: string | undefined = formData.get("1")?.toString();
    let num2: string | undefined = formData.get("2")?.toString();
    let num3: string | undefined = formData.get("3")?.toString();
    let num4: string | undefined = formData.get("4")?.toString();
    let num5: string | undefined = formData.get("5")?.toString();
    let num6: string | undefined = formData.get("6")?.toString();
    if (num1 && num2 && num3 && num4 && num5 && num6)
      nums = nums.concat(num1, num2, num3, num4, num5, num6);
    
    const turnOn = await fetch(
      "http://localhost:3000/api/updateProfile/2fa/authenticate",
      {
        method: "POST",
        body: JSON.stringify({code:nums, username: data.response.user.username}),
      }
    );
    let val =await turnOn.text();
    if(val)
    {
      cookie.set("userData",val);
      router.push("http://localhost:3000/UserProfile");
    }
  };
  return (
    <>
      <main className="auth__card ">
        <div className="auth__credentials auth__2fa">
          <div className="auth__2fa__profile">
            <Image
              src={"/img/profileImage.svg"}
              width={180}
              height={180}
              alt="profile"
            />
            <h3 className="auth__2fa__username"> {data.response.user.uniquename}</h3>
          </div>
          <p className="auth__2fa__msg">enter 6-digit code from your 2fa app</p>
          <form action={Authenticate} className="auth__2fa__form">
            <div className="auth__2fa__form__inputs">
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="1"
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="2"
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="3"
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="4"
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="5"
                required
              />
              <input
                type="text"
                pattern="^[0-9]$"
                maxLength={1}
                className="auth__2fa__input"
                name="6"
                required
              />
            </div>
            <button className="auth__2fa__form__btn">confirm</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Auth_2fa;
