import Style from "./UserManagement.module.css";
import User from "./user/User";

export default function UserManagement() {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    // event.preventDefault()
    console.log(event.currentTarget.value);
  };

  return (
    <>
      <div className={Style.container}>
        <form action="">
          <input
            type="text"
            onChange={handleChange}
            placeholder="user name to search for"
          />
        </form>
        <div className={Style.Searchicon} />
      </div>
      <div className={Style.users}>
        <User />
      </div>
    </>
  );
}
