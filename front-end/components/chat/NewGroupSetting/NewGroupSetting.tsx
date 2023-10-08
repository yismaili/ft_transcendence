import { useEffect, useState } from "react";
import Style from "./NewGroupSetting.module.css";
import NewGroupInput from "./NewGroupInput/NewGroupInput";

type props = {
  setGroupInput: Function;
};

export default function NewGroupSetting({ setGroupInput }: props) {
  const [isOpen, setOpen] = useState(false);
  const [input, setInput] = useState<GroupInput>();

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
            <div className={Style.avatar}>
              <div className={Style.changeImg} />
            </div>
            <div className={Style.main}>
              <div className={Style.header}>
                <div className={Style.groupBtn}>
                  <p>Group Setting</p>
                </div>
              </div>
              <NewGroupInput setInput={setInput} closePopUp={closePopUp} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

// import { useState } from "react";
// import Style from "./GroupSetting.module.css";
// import GroupInput from "./GroupInput/GroupInput";
// import UserManagement from "./UserManagement/UserManagement";

// export default function GroupSetting() {
//   const [isOpen, setOpen] = useState(false);
//   const [isgroupSetting, setgroupSetting] = useState(true);

//   const closePopUp = () => setOpen(!isOpen);

//   return (
//     <>
//       <div className={Style.container} onClick={closePopUp} />
//       {isOpen && (
//         <>
//           <div className={Style.backDrop} onClick={closePopUp} />
//           <div className={Style.popUpContainer}>
//             <div className={Style.closeImg} onClick={closePopUp} />
//             <div className={Style.avatar}>
//               <div className={Style.changeImg} />
//             </div>
//             <div className={Style.main}>
//               <div className={Style.header}>
//                 <div
//                   className={`${Style.groupBtn} ${
//                     !isgroupSetting && Style.OnLeft
//                   }`}
//                   onClick={() => setgroupSetting(true)}
//                 >
//                   <p>Group Setting</p>
//                 </div>
//                 <div
//                   className={`${Style.usersBtn} ${
//                     isgroupSetting && Style.OnRight
//                   }`}
//                   onClick={() => setgroupSetting(false)}
//                 >
//                   <p>Users Management</p>
//                 </div>
//               </div>
//               {isgroupSetting ? (
//                 <>
//                   <GroupInput />
//                 </>
//               ) : (
//                 <>
//                   <UserManagement />
//                 </>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
