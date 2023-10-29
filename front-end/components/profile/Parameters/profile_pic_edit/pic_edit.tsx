"use client";
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./pic_edit.css";
import React from "react";

interface nums {
  user: User;
  update: Function;
}

export default function PicEdit(props: nums) {

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let form = new FormData();
    let img = e.target.files;
    if (img) {
      form.append("uniquename", props.user.data.uniquename);
      form.append("lastName", props.user.data.lastName);
      form.append("firstName", props.user.data.firstName);
      form.append("image", img[0]);
      // console.log("test", form);
      const fetching = await fetch(
        "http://localhost:3000/api/updateProfile/avatar",
        {
          method: "PUT",
          body: form,
        }
      );
      let res = await fetching.text();
      // console.log(res);
      if(res == "\"done\"")
        props.update(true);
      // else
    }
  };

  return (
    <div className="Params__pic">
      <span
        className="Params__profile__pic"
        style={{ backgroundImage: `url(${props.user.data.picture})` }}
      >
        <label htmlFor="fileInput">
          <span className="pic__edit__btn">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }} // Hide the input
              onChange={handleFileChange}
            />
          </span>
        </label>
      </span>
    </div>
  );
}
