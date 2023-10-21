import { useState } from "react";
import Style from "./AllGroupUsers.module.css";
import UserManagement from "./GroupUserManagement/GroupUserManagement";

type props = {
  setOpen: Function;
  room: AllRooms;
};

export default function AllGroupUsers({ setOpen, room }: props) {
  return (
    <>
      <div
        className={Style.backDrop}
        onClick={() => setOpen((prev: boolean) => !prev)}
      />
      <div className={Style.popUpContainer}>
        <div
          className={Style.closeImg}
          onClick={() => setOpen((prev: boolean) => !prev)}
        />
        <div className={Style.avatar} />
        <div className={Style.main}>
          <div className={Style.header}>
            <div className={Style.usersBtn}>
              <p>All Group Users</p>
            </div>
          </div>
          <UserManagement room={room} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}
