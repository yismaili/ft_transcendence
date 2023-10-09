import Style from "./GroupFriendContextMenu.module.css";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
};

export default function GroupFriendContextMenu({ setMenuOpen, menuPosition }: props) {
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
            <p>Leave Group</p>
          </li>
        </menu>
      </div>
    </>
  );
}
