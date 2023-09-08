import Style from "./Login.module.css";

export default function Login() {
  return (
    <main className={Style.container}>
      <div className={Style.leftDiv}>
        <div className={Style.imageDiv}></div>
      </div>
      <div className={Style.rightDiv}>
        <div className={Style.text}>
          <h1>Happening now</h1>
          <p className={Style.firstP}>Join today.</p>
        </div>
        <div className={Style.inputs}>
          <div className={Style.slideBtn}>
            <p className={Style.signUp}>Sign up</p>
            <p className={Style.signIn}>Sign in</p>
            <div className={Style.subSlideBtn}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
