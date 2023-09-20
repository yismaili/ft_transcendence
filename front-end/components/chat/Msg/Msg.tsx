import Style from './Msg.module.css'
import LeftChat from './LeftChat/LeftChat'
import RightChat from './RightChat/RightChat'
import InputChat from './InputChat/InputChat'

export default function Msg() {
  return (
    <div className={Style.container}>
        <LeftChat />
        <RightChat />
        <LeftChat />
        <RightChat />
        <LeftChat />
        <RightChat />
        <RightChat />
        <LeftChat />
        <RightChat />
        <InputChat />
    </div>
  )
}
