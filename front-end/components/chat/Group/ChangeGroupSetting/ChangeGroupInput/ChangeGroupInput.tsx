import { useState } from "react";
import Style from "./ChangeGroupInput.module.css";

export default function ChangeGroupInput() {
  const [edit, setEdit] = useState(false);

  // const handleAction = async (formData: FormData) => {
  //   if (formData.get("name")) {
  //     setInput({
  //       name: formData.get("name"),
  //       status: formData.get("status"),
  //       password: formData.get("password"),
  //     });
  //     closePopUp();
  //   }
  // };

  return (
    <div className={Style.container}>
      <div className={Style.subContainer}>
        <form action="" id="_Name" onSubmit={(e) => e.preventDefault()}>
          <p>Name</p>
          <input
            type="text"
            name="Name"
            placeholder="server123"
            readOnly={!edit}
            className={edit ? ` ${Style.active}` : `${Style.input}`}
            autoComplete="off"
          />
        </form>
        <button
          type="submit"
          form="_Name"
          onClick={() => setEdit((prev) => !prev)}
        >
          {edit ? `Save` : "Edit"}
        </button>
      </div>
      <div className={Style.subContainer}>
        <form action="" id="_Status" onSubmit={(e) => e.preventDefault()}>
          <p>Status</p>
          <input
            type="text"
            name="status"
            placeholder="private"
            readOnly={!edit}
            className={edit ? ` ${Style.active}` : `${Style.input}`}
            autoComplete="off"
          />
        </form>
        <button type="submit" form="_Status">
          Edit
        </button>
      </div>
      <div className={Style.subContainer}>
        <form action="" id="_Password" onSubmit={(e) => e.preventDefault()}>
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="********"
            readOnly={!edit}
            className={edit ? ` ${Style.active}` : `${Style.input}`}
            autoComplete="off"
          />
        </form>
        <button type="submit" form="_Password">
          Edit
        </button>
      </div>
      <button id={Style.create_group}>Remove</button>
    </div>
  );
}
