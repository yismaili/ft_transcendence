import Style from "./NewGroupInput.module.css";

type props = {
  setInput: Function;
  closePopUp: Function;
};

export default function NewGroupInput({ setInput, closePopUp }: props) {
  const handleAction = async (formData: FormData) => {
    if (formData.get("name")) {
      setInput({
        name: formData.get("name"),
        status: formData.get("status"),
        password: formData.get("password"),
      });
      closePopUp();
    }
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
            <select name="status" id="_status">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div className={Style.subContainer}>
          <label htmlFor="Name">Password</label>
          <input type="password" name="password" placeholder="********" />
        </div>
      </form>
      <button id={Style.create_group} type="submit" form="create_group">
        Create
      </button>
    </div>
  );
}
