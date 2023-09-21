import { revalidatePath } from "next/cache";
import Style from "./InputChat.module.css";
// import create from "../../../../action/userData";

export default function InputChat() {
  const create = async (formData: FormData) => {
    // formData.get("content");
    console.log(formData.get("message"));
    revalidatePath('/chat');
  };

  return (
    <div className={Style.container}>
      <div className={Style.subContainer}>
        <form action={create}>
          <input placeholder="Enter message" name="message" />
          {/* <button type="submit">Add to Cart</button> */}
        </form>
        <div className={Style.sendIcon}></div>
      </div>
    </div>
  );
}
