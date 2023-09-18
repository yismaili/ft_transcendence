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
