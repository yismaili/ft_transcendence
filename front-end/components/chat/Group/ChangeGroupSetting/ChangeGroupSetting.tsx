import { useState } from "react";
import Style from "./ChangeGroupSetting.module.css";
import UserManagement from "./UserManagement/UserManagement";
import ChangeGroupInput from "./ChangeGroupInput/ChangeGroupInput";

type props = {
  setOpen: Function;
  room: AllRooms;
};

export default function ChangeGroupSetting({ setOpen, room }: props) {
  const [isgroupSetting, setgroupSetting] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [imageToShow, setImageToShow] = useState<string | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length > 0) {
      setSelectedFile(file[0]);
      setImageToShow(URL.createObjectURL(file[0]));
    }
  };

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
        <div
          className={Style.avatar}
          style={{
            backgroundImage: `url(${
              imageToShow ? imageToShow : "/img/home/avatar.png"
            })`,
          }}
        >
          <label htmlFor="fileInput">
            <div className={Style.changeImg}>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }} // Hide the input
                onChange={handleFileChange}
              />
            </div>
          </label>
        </div>
        <div className={Style.main}>
          <div className={Style.header}>
            <div
              className={`${Style.groupBtn} ${!isgroupSetting && Style.OnLeft}`}
              onClick={() => setgroupSetting(true)}
            >
              <p>Group Setting</p>
            </div>
            <div
              className={`${Style.usersBtn} ${isgroupSetting && Style.OnRight}`}
              onClick={() => setgroupSetting(false)}
            >
              <p>Users Management</p>
            </div>
          </div>
          {isgroupSetting ? (
            <>
              <ChangeGroupInput
                setOpen={setOpen}
                room={room}
                picture={selectedFile}
              />
            </>
          ) : (
            <>
              <UserManagement room={room} setOpen={setOpen} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
