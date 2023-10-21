import { useEffect, useState } from "react";
import Style from "./ChangeGroupInput.module.css";
import { useSocketContext } from "@/contexts/socket-context";
type props = {
  setOpen: Function;
  room: AllRooms;
};

export default function ChangeGroupInput({ setOpen, room }: props) {
  const { socket, Data } = useSocketContext();
  const [editName, setEditName] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [isProtected, setIsProtected] = useState(
    room.chatRooms.status === "protected"
  );
  const [disabled, setDisabled] = useState(true);
  const [newName, setNewName] = useState<string | undefined>(
    room.chatRooms.name
  );

  const options = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "protected", label: "Protected" },
  ];

  const sortedOptions = options.sort((a, b) => {
    if (a.value === room.chatRooms.status) return -1;
    if (b.value === room.chatRooms.status) return 1;
    return 0;
  });
  options.splice(0, options.length, ...sortedOptions);

  const updateData = (
    name: string | undefined,
    status: string | undefined,
    password: string | undefined
  ) => {
    // console.log("name:", name, "status:", status, "password:", password);
    if (!status) status = room.chatRooms.status;
    console.log("room to change:", room);
    console.log("new name:", name);
    socket.emit(
      "updateChatRoomInfo",
      {
        RoomId: room.chatRooms.RoomId,
        username: Data.response.user.username,
        chatRoomName: name,
        status: status,
        password: password,
      },
      (response: any) => {
        console.log("res", response);
      }
    );
  };

  const handleAction = async (formData: FormData) => {
    setDisabled(true);
    if (formData.get("name")?.length) {
      setNewName(formData.get("name")?.toString());
      updateData(formData.get("name")?.toString(), undefined, undefined);
    } else {
      if (formData.get("secure")?.toString() === "protected") {
        updateData(newName, "protected", formData.get("password")?.toString());
      } else {
        updateData(newName, formData.get("secure")?.toString(), undefined);
      }
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value === "protected") setIsProtected(true);
    else setIsProtected(false);
  };

  const handleRemove = () => {
    console.log(Data.response.user.username);

    socket.emit(
      "deleteChatRoom",
      {
        username: Data.response.user.username,
        chatRoomName: room.chatRooms.RoomId,
      },
      (response: any) => {
        console.log("remove", response);
      }
    );
  };

  return (
    <div className={Style.container}>
      <div className={Style.subContainer}>
        <form action={handleAction} id="_Name">
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder={`${room.chatRooms.name}`}
            readOnly={!editName}
            className={editName ? ` ${Style.active}` : `${Style.input}`}
            autoComplete="off"
          />
        </form>
        <button
          type={editName ? "button" : "submit"}
          form="_Name"
          onClick={() => setEditName((prev) => !prev)}
        >
          {editName ? `Save` : "Edit"}
        </button>
      </div>
      <div className={Style.subContainer}>
        <form id="__status" action={handleAction}>
          <p>Status</p>
          <select
            name="secure"
            disabled={disabled}
            className={editStatus ? ` ${Style.active}` : `${Style.input}`}
            onChange={handleSelect}
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
          {isProtected && (
            <div className={Style.subContainer}>
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="********"
                className={Style.active}
                required
              />
            </div>
          )}
        </form>
        <button
          type={editStatus ? "button" : "submit"}
          form="__status"
          onClick={() => {
            setEditStatus((prev) => !prev);
            setDisabled(false);
          }}
        >
          {editStatus ? `Save` : `Edit`}
        </button>
      </div>
      <button id={Style.create_group} onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
