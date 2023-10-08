import Style from "./CustomMenu.module.css";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
};

export default function CustomMenu({ setMenuOpen, menuPosition }: props) {
    
  return (
    <>
      <div
        className={Style.backDrop}
        onClick={() => setMenuOpen((prev: boolean) => !prev)}
      />
      <div
        className={Style.container}
        style={{ top: menuPosition.y, left: menuPosition.x }}
      >
        <div className={Style.battleImg} />
        <p>battle</p>
        <div className={Style.line} />
        <div className={Style.profileImg} />
        <p>profile</p>
        <div className={Style.line} />
        <div className={Style.blockImg} />
        <p>block</p>
      </div>
    </>
  );
}
