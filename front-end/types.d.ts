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
type history = {
  date: string;
  id: 1;
  resulteOfCompetitor: 5;
  resulteOfUser: number;
  user: Player;
  userCompetitor: Player;
};

type Player = {
  email: string;
  firstName: string;
  id: number;
  isTwoFactorAuthEnabled: false;
  lastName: string;
  picture: string;
  status: string;
  twoFactorAuthSecret: string;
  uniquename: string;
  username: string;
}

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
  user: User_Friend;
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
  owner: boolean;
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
  owner: boolean;
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
  friend: User_Friend;
};

// type FriendRequest2 = {
//   id: number;
//   status: string;
//   friend: User_Friend;
// };

type gameRequest = {
  receiver: User_Friend;
  sender: User_Friend;
};

type gameOver = {
  gameOver: boolean;
  loser: User_Friend;
  loserScore: number;
  winner: User_Friend;
  winnerScore: number;
};
