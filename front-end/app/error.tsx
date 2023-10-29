"use client";
import "@/styles/global.css";
import "@/global_css/utilityClasses.css";
import { useRouter } from "next/navigation";
import Cookies from "cookies-ts";
import "@/components/Error/Error.css"

export default function Errorfirst() {
  const router = useRouter();
  const cookies = new Cookies();
  return (
    <div className="ErrorContainer">
      <div className="Error">
        <h1 className="Error__title"> Error</h1>
        <div className="Error__btns">
          <button
            className="Error__handle__btn"
            onClick={() => {
              cookies.remove("userData");
              router.push(`http://localhost:3000/`);
            }}
          >
            go back to landing
          </button>
        </div>
      </div>
    </div>
  );
}