import Style from './InputChat.module.css'

export default function InputChat() {
  return (
    <div className={Style.container}>
        <div className={Style.subContainer}>
            <input type="text" placeholder='Enter message'/>
            <div className={Style.sendIcon}></div>
        </div>
    </div>
  )
}
