import Style from "./GroupInput.module.css";

export default function GroupInput() {
  return (
    <div className={Style.container}>
      <div className={Style.name}>
        <form action="" id="_Name">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="Name"
            value={`My name dont forget`}
            readOnly
          />
        </form>
        <button type="submit" form="_Name">
          Edit
        </button>
      </div>
      <div className={Style.status}></div>
      <div className={Style.password}></div>
    </div>
  );
}
