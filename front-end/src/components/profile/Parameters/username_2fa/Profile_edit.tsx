import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./Profile_edit.css";

interface nums {
  user: User;
}

export default function ProfileEdit(props: nums) {
  return (
    <>
      <form className="form">
        <div>
          <label htmlFor="username" className="form__label">
            USERNAME
          </label >
          <input
            type="text"
            placeholder={`${props.user.username}`}
            id="username"
          />
        </div>
        <input type="submit" value="Edit" className="edit__btn" />
      </form>
      <form className="form">
        <div>
        <label htmlFor="2FA" className="form__label">2FA</label>
          <select id="2FA" name="cars" size={1}>
            <option value="enabled">Enabled</option>
            <option value="enabled">Disabled</option>
          </select>
        </div>
        <input type="submit" value="Edit" className="edit__btn" />
      </form>
    </>
  );
}
