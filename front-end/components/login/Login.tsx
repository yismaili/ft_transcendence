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
            <p className={Style.signUpTxt}>Sign up</p>
            <p className={Style.signInTxt}>Sign in</p>
            <div className={Style.subSlideBtn}></div>
          </div>
            <div className={Style.googleBtn}>
              <div className={Style.googleImg}></div>
              <p>Sign up with google</p>
            </div>
            <div className={Style.boundary}>
              <div className={Style.leftLine}></div>
              <p>OR</p>
              <div className={Style.rightLine}></div>
            </div>
            <div className={Style.intraBtn}>
              <div className={Style.intraImg}></div>
              <p>Sign up with intra</p>
            </div>
        </div>
      </div>
    </main>
  );
}
