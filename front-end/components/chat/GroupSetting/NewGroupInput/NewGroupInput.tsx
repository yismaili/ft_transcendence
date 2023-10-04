import Style from "./NewGroupInput.module.css";

type props = {
  setInput: Function;
};

export default function NewGroupInput({ setInput }: props) {
  const handleAction = async (formData: FormData) => {
    setInput({
      name: formData.get("name"),
      status: formData.get("status"),
      password: formData.get("password"),
    });
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
// import Style from "./GroupInput.module.css";

// export default function GroupInput() {
//   return (
//     <div className={Style.container}>
//       <div className={Style.subContainer}>
//         <form action="" id="_Name">
//           <label htmlFor="Name">Name</label>
//           <input type="text" name="Name" placeholder="server123" readOnly />
//         </form>
//         <button type="submit" form="_Name">
//           Edit
//         </button>
//       </div>
//       <div className={Style.subContainer}>
//         <form action="" id="_Status">
//           <label htmlFor="Name">Status</label>
//           <input type="text" name="status" placeholder="private" readOnly />
//         </form>
//         <button type="submit" form="_Status">
//           Edit
//         </button>
//       </div>
//       <div className={Style.subContainer}>
//         <form action="" id="_Password">
//           <label htmlFor="Name">Password</label>
//           <input type="password" name="password" placeholder="********" readOnly />
//         </form>
//         <button type="submit" form="_Password">
//           Edit
//         </button>
//       </div>
//       <button id={Style.create_group}>Remove</button>
//     </div>
//   );
// }
