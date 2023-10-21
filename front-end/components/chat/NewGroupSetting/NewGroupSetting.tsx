import { useEffect, useState } from "react";
import Style from "./NewGroupSetting.module.css";
import NewGroupInput from "./NewGroupInput/NewGroupInput";
import GroupManagement from "./GroupManagement/GroupManagement";

type props = {
  setGroupInput: Function;
};

export default function NewGroupSetting({ setGroupInput }: props) {
  const [isOpen, setOpen] = useState(false);
  const [input, setInput] = useState<GroupInput>();
  const [isgroupSetting, setgroupSetting] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [defaultImage, setDefaultImage] = useState<File>();
  const [imageToShow, setImageToShow] = useState<string | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length > 0) {
      setSelectedFile(file[0]);
      setImageToShow(URL.createObjectURL(file[0]));
    }
  };

  // async function pathToBlob(path: string): Promise<File | null> {
  //   try {
  //     // Fetch the image
  //     const response = await fetch(path);
  //     const blob = await response.blob();

  //     // Create a File from the Blob
  //     const fileName = path.split("/").pop() || "image.jpg"; // Provide a default name
  //     const file = new File([blob], fileName, { type: blob.type });

  //     return file;
  //   } catch (error) {
  //     console.error("Error converting image:", error);
  //     return null;
  //   }
  // }

  // // Usage
  // const imagePath = "/img/home/avatar.png";

  //   pathToBlob(imagePath).then((file) => {
  //     if (file) {
  //       console.log("tttt");

  //       setDefaultImage(file);
  //       // Now you have the image as a File
  //     }
  //   });

  const closePopUp = () => setOpen(!isOpen);

  useEffect(() => {
    if (input) setGroupInput(input);
  }, [input]);

  return (
    <>
      <div className={Style.container} onClick={closePopUp} />
      {isOpen && (
        <>
          <div className={Style.backDrop} onClick={closePopUp} />
          <div className={Style.popUpContainer}>
            <div className={Style.closeImg} onClick={closePopUp} />
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
                  className={`${Style.groupBtn} ${
                    !isgroupSetting && Style.OnLeft
                  }`}
                  onClick={() => setgroupSetting(true)}
                >
                  <p>Group Setting</p>
                </div>
                <div
                  className={`${Style.usersBtn} ${
                    isgroupSetting && Style.OnRight
                  }`}
                  onClick={() => setgroupSetting(false)}
                >
                  <p>Find Group</p>
                </div>
              </div>
              {isgroupSetting ? (
                <NewGroupInput
                  setInput={setInput}
                  closePopUp={closePopUp}
                  picture={selectedFile ? selectedFile : defaultImage}
                />
              ) : (
                <>
                  <GroupManagement setOpen={setOpen} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
