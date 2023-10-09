import Style from "./GroupMsgContextMenu.module.css";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
};

export default function GroupMsgContextMenu({ setMenuOpen, menuPosition }: props) {
  return (
    <>
      <div
        className={Style.backDrop___}
        onClick={() => setMenuOpen((prev: boolean) => !prev)}
      />
      <div
        style={{ top: menuPosition.y, left: menuPosition.x }}
        className={Style.context}
      >
        <menu className={Style.context__menu}>
          <li className={Style.context__menu__opt}>
            <p>remove</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>mute / unmute</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Ban</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Promote / demote</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Play</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Profile</p>
          </li>
        </menu>
      </div>
    </>
  );
}
