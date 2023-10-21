import "./FriendContextMenu.css";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
};

export default function FriendContextMenu({
  setMenuOpen,
  menuPosition,
}: props) {
  return (
    <>
      <div
        className="backDrop___"
        onClick={() => setMenuOpen((prev: boolean) => !prev)}
      />
      <div
        style={{ top: menuPosition.y, left: menuPosition.x }}
        className="context"
      >
        <menu className="context__menu">
          <li className="context__menu__opt">
            <span className="context__menu__opt__icon Battle"></span>
            <p>Play</p>
          </li>
          <li className="context__menu__opt borders">
            <span className="context__menu__opt__icon Profile"></span>
            <p>Profile</p>
          </li>
          <li className="context__menu__opt">
            <span className="context__menu__opt__icon Block"></span>
            <p>Block</p>
          </li>
        </menu>
      </div>
    </>
  );
}
