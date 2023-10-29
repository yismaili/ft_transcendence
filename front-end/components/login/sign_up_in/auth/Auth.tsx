import Style from "./Auth.module.css";
import Cookies from "cookies-ts";
import { useRouter } from "next/navigation";

type Props = {
  Sign_in_up: string;
};

export default function Auth({ Sign_in_up }: Props) {
  const router = useRouter();

  const handleAuth = async (url: string) => {
    let auth_window = window.open(
      url,
      "",
      "width=600,height=600,top=200,left=300"
    );

    if (auth_window != null) {
      let interval = setInterval(() => {
        const cookies = new Cookies();
        const mycookie = cookies.get("userData");

        if (mycookie) {
          let filler: string = mycookie;
          clearInterval(interval);
          let cookie = filler.replace("j:", "");
          console.clear();
          let cookieval = JSON.parse(cookie);
          cookies.set("userData", cookie);
          auth_window?.close();
          if (!cookieval.response.user.status) {
            router.push(
              `http://localhost:3000/users/${cookieval.response.user.username}/Parameters`
            );
          } else if (cookieval.response.user.isTwoFactorAuthEnabled)
            router.push("http://localhost:3000/login/2FA");
          else
            router.push(
              `http://localhost:3000/users/${cookieval.response.user.username}`
            );
          console.clear();
        }
      }, 1000);
    }
  };

  return (
    <>
      <div
        className={Style.googleBtn}
        onClick={() => handleAuth(`http://localhost:3001/auth/google/callback`)}
      >
        <div className={Style.googleImg}></div>
        <p>{Sign_in_up} with google</p>
      </div>
      <div className={Style.boundary}>
        <div className={Style.leftLine}></div>
        <p>OR</p>
        <div className={Style.rightLine}></div>
      </div>
      <div
        className={Style.intraBtn}
        onClick={() => handleAuth(`http://localhost:3001/auth/intra/callback`)}
      >
        <div className={Style.intraImg}></div>
        <p>{Sign_in_up} with intra</p>
      </div>
    </>
  );
}
