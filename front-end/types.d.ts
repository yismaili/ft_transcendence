type User = {
  data: {
    id: number;
    username: string;
    firstName: string;
    email: string;
    picture: string;
    profile: {
      id: string;
      score: number;
      los: number;
      win: number;
      xp: number;
      level: number;
    };
    userRelations: Array;
    friendRelations: Array;
    achievements: Array;
    histories: Array;
  };
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
