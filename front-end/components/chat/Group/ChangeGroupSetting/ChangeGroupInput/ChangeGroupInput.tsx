import Style from "./ChangeGroupInput.module.css";

export default function ChangeGroupInput() {
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
        <form action="" id="_Name">
          <label htmlFor="Name">Name</label>
          <input type="text" name="Name" placeholder="server123" readOnly />
        </form>
        <button type="submit" form="_Name">
          Edit
        </button>
      </div>
      <div className={Style.subContainer}>
        <form action="" id="_Status">
          <label htmlFor="Name">Status</label>
          <input type="text" name="status" placeholder="private" readOnly />
        </form>
        <button type="submit" form="_Status">
          Edit
        </button>
      </div>
      <div className={Style.subContainer}>
        <form action="" id="_Password">
          <label htmlFor="Name">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            readOnly
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
