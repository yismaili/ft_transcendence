import { useState } from "react";
import Style from "./AllGroupUsersAdmin.module.css";
import UserManagement from './UserManagement/UserManagement'

type props = {
  setOpen: Function;
  room: AllRooms;
};

export default function AllGroupUsersAdmin({ setOpen, room }: props) {
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
