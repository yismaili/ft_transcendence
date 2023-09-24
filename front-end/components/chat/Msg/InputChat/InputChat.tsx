import { revalidatePath } from "next/cache";
import Style from "./InputChat.module.css";
import { useRef } from "react";

type props = {
  socket: any;
  setMessage: Function;
};

export default function InputChat({ socket, setMessage }: props) {
  const ref = useRef<HTMLFormElement>(null);
  const create = async (formData: FormData) => {
    ref.current?.reset();
    if (formData.get("message"))
      setMessage(formData.get("message"));
  };

  return (
    <div className={Style.container}>
      <div className={Style.subContainer}>
        <form ref={ref} action={create}>
          <input
            placeholder="Enter message"
            name="message"
            autoComplete="off"
          />
          <button className={Style.sendIcon}></button>
        </form>
      </div>
    </div>
  );
}
