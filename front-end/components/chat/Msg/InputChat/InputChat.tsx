import Style from "./InputChat.module.css";
// import create from "../../../../action/userData";

export default function InputChat() {
  const create = async (formData: FormData) =>{

    console.log('test');  
  }

  return (
    <div className={Style.container}>
      <div className={Style.subContainer}>
        <form action={create}>
          <input type="text" placeholder="Enter message" />
          <button type="submit">Add to Cart</button>
        </form>
        <div className={Style.sendIcon}></div>
      </div>
    </div>
  );
}
