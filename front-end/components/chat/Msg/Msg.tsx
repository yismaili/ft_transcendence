import Style from './Msg.module.css'
import LeftChat from './LeftChat/LeftChat'
import RightChat from './RightChat/RightChat'

export default function Msg() {
  return (
    <div className={Style.container}>
        <LeftChat />
        <RightChat />
        <LeftChat />
        <RightChat />
        <LeftChat />
        <RightChat />
    </div>
  )
}
