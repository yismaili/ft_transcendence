import { revalidatePath } from "next/cache";
import Style from "./InputChat.module.css";

type props = {
  socket: any;
  setMessage: Function;
};

export default function InputChat({ socket, setMessage }: props) {
  const create = async (formData: FormData) => {
    setMessage(formData.get("message"));
    // revalidatePath("/chat");
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
