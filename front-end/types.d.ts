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

type UserArray = {
  data: Array<{
    id: number;
    status: string;
    user: {
      email: string;
      firstName: string;
      id: number;
      lastName: string;
      picture: string;
      username: string;
    };
  }>;
};

type UserFriend = {
  id: number;
  status: string;
  user: {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    picture: string;
    username: string;
  };
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
