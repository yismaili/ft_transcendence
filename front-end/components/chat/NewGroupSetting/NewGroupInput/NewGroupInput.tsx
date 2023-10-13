import { useState } from "react";
import Style from "./NewGroupInput.module.css";

type props = {
  setInput: Function;
  closePopUp: Function;
};

export default function NewGroupInput({ setInput, closePopUp }: props) {
  const [isProtected, setIsProtected] = useState(false);

  const handleAction = async (formData: FormData) => {
    if (formData.get("name")) {
      if (formData.get("status") === "protected" && formData.get("password")) {
        setInput({
          name: formData.get("name"),
          status: formData.get("status"),
          password: formData.get("password"),
        });
        closePopUp();
      } else if (formData.get("status") === "private") {
        setInput({
          name: formData.get("name"),
          status: "private",
          password: "",
        });
        closePopUp();
      } else {
        setInput({
          name: formData.get("name"),
          status: "public",
          password: "",
        });
        closePopUp();
      }
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value === "protected") setIsProtected(true);
    else setIsProtected(false);
  };

  return (
    <div className={Style.container}>
      <form action={handleAction} id="create_group">
        <div className={Style.subContainer}>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="server123"
            autoComplete="off"
          />
        </div>
        <div className={Style.subContainer}>
          <label htmlFor="Name">Status</label>
          <div className={Style.forBorder}>
            <select name="status" onChange={handleSelect}>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="protected">Protected</option>
            </select>
          </div>
        </div>
        {isProtected && (
          <div className={Style.subContainer}>
            <label htmlFor="Name">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>
        )}
      </form>
      <button id={Style.create_group} type="submit" form="create_group">
        Create
      </button>
    </div>
  );
}
