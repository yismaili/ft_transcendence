import Style from "./Msg.module.css";
import LeftChat from "./LeftChat/LeftChat";
import RightChat from "./RightChat/RightChat";
import InputChat from "./InputChat/InputChat";

type props = {
  datatoShow: UserFriend | undefined;
};

export default function Msg({ datatoShow }: props) {
  if (datatoShow != undefined) {
    console.log(datatoShow);
    
    return (
      <div className={Style.container}>
        <LeftChat />
        <RightChat />
        <InputChat />
      </div>
    );
  }

  return (
    <div className={Style.container}>
      Loading.........
    </div>
  );
}
