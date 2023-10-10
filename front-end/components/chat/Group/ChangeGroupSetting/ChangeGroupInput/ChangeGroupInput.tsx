import { useState } from "react";
import Style from "./ChangeGroupInput.module.css";

type props = {
  setOpen: Function;
}

type obj = {
  name: string | undefined;
  status: string | undefined;
  password: string | undefined;
};

export default function ChangeGroupInput({ setOpen }: props) {
  const [editName, setEditName] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  let obj: obj = {
    name: "",
    status: "",
    password: "",
  };

  const handleAction = async (formData: FormData) => {
    if (formData.get("Name")?.toString() == null) {
        obj.name = formData.get("name")?.toString()
        obj.name = formData.get("status")?.toString()
        obj.name = formData.get("password")?.toString()
    }
    // setOpen();
  };

  return (
    <div className={Style.container}>
      <div className={Style.subContainer}>
        <form action={handleAction} id="_Name" >
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="server123"
            readOnly={!editName}
            className={editName ? ` ${Style.active}` : `${Style.input}`}
            autoComplete="off"
          />
        </form>
        <button
          type="submit"
          form="_Name"
          onClick={() => setEditName((prev) => !prev)}
        >
          {editName ? `Save` : "Edit"}
        </button>
      </div>
      <div className={Style.subContainer}>
        <form action="" id="_Status" onSubmit={(e) => e.preventDefault()}>
          <p>Status</p>
          <input
            type="text"
            name="status"
            placeholder="private"
            readOnly={!editStatus}
            className={editStatus ? ` ${Style.active}` : `${Style.input}`}
            autoComplete="off"
          />
        </form>
        <button
          type="submit"
          form="_Status"
          onClick={() => setEditStatus((prev) => !prev)}
        >
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
            readOnly={!editPassword}
            className={editPassword ? ` ${Style.active}` : `${Style.input}`}
            autoComplete="off"
          />
        </form>
        <button
          type="submit"
          form="_Password"
          onClick={() => setEditPassword((prev) => !prev)}
        >
          Edit
        </button>
      </div>
      <button id={Style.create_group}>Remove</button>
    </div>
  );
}
