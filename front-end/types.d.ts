type User = {
  data: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    uniquename: string;
    isTwoFactorAuthEnabled: boolean;
    email: string;
    picture: string;
    profile: Profile;
    userRelations: Array;
    friendRelations: Array;
    achievements: Array;
    histories: Array;
    status: string;
  };
};

type Profile = {
  id: string;
  score: number;
  los: number;
  win: number;
  xp: number;
  level: number;
};

type UserArrayData = {
  data: UserArray[];
};

type UserArray = {
  id: number;
  status: string;
  friend: User_Friend;
  user: User_Friend;
};

type User_Friend = {
  email: string;
  firstName: string;
  id: number;
  isTwoFactorAuthEnabled: boolean;
  lastName: string;
  picture: string;
  status: string;
  twoFactorAuthSecret: string;
  uniquename: string;
  username: string;
};

type allMessages = {
  dateToSend: string;
  id: number;
  message: string;
  user: {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    picture: string;
    username: string;
  };
};

type GroupInput = {
  name: string;
  status: string;
  password?: string;
  picture: File;
};

type CreateRoom = {
  RoomId: string;
  id: number;
  name: string;
  status: string;
};

type AllRooms = {
  chatRooms: {
    RoomId: string;
    id: number;
    name: string;
    password: string;
    picture: string;
    status: string;
  };
  id: number;
  statusPermissions: string;
  statusUser: string;
  time: any;
};

type allGroupMessages = {
  date: string;
  id: number;
  message: string;
  user: User_Friend;
};

type allGroupUsers = {
  id: number;
  statusPermissions: string;
  statusUser: string;
  time: any;
  user: User_Friend;
};

type FriendUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  uniquename: string;
  email: string;
  profile: Profile;
};

type FriendRequest = {
  id: number;
  status: string;
  user: User_Friend;
};

type gameRequest = {
  roomName: string;
  sender: User_Friend;
};
