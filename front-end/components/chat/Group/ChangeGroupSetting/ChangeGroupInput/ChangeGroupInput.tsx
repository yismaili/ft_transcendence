import { useEffect, useState } from "react";
import Style from "./ChangeGroupInput.module.css";
import { useSocketContext } from "@/contexts/socket-context";
type props = {
  setOpen: Function;
  room: AllRooms;
  picture: File | null | undefined;
};

export default function ChangeGroupInput({ setOpen, room, picture }: props) {
  const { socket, Data } = useSocketContext();
  const [editName, setEditName] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [isProtected, setIsProtected] = useState(
    room.chatRooms.status === "protected"
  );
  const [disabled, setDisabled] = useState(true);
  const [newName, setNewName] = useState<string | null>(room.chatRooms.name);

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
    name: string | null,
    status: string | null,
    password: string | null
  ) => {
    if (!status) status = room.chatRooms.status;

    if (picture == undefined) picture = null;

    socket.emit(
      "updateChatRoomInfo",
      {
        roomId: room.chatRooms.RoomId,
        username: Data.response.user.username,
        chatRoomName: name,
        status: status,
        password: password,
        picture: picture,
      }
    );
  };

  const handleAction = async (formData: FormData) => {
    setDisabled(true);
    if (formData.get("name")?.length) {
      const name = formData.get("name")?.toString();
      if (name == undefined) {
        setNewName(null);
        updateData(null, null, null);
      } else {
        setNewName(name);
        updateData(name, null, null);
      }
    } else {
      const secure = formData.get("password")?.toString();
      if (formData.get("secure")?.toString() === "protected" && secure) {
        updateData(newName, "protected", secure);
      } else if (formData.get("secure")?.toString() === "private") {
        updateData(newName, "private", null);
      } else updateData(newName, "public", null);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value === "protected") setIsProtected(true);
    else setIsProtected(false);
  };

  const handleRemove = () => {
    socket.emit("deleteChatRoom", {
      username: Data.response.user.username,
      chatRoomName: room.chatRooms.RoomId,
    });
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
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                title="Minimum eight characters, at least one letter and one number"
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
