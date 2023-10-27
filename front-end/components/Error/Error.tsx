"use client";
import "@/styles/global.css";
import "@/global_css/utilityClasses.css";
import "./Error.css";

export default function DefError() {
  return (
    <div className="ErrorContainer">
      <div className="Error">
        <h1 className="Error__title"> Error</h1>
        <div className="Error__btns">
          <button className="Error__handle__btn">retry</button>
          <button className="Error__redir__btn">go back Home</button>
        </div>
      </div>
    </div>
  );
}