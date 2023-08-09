import { User } from "../src/typeorm/entities/User.entity";

export type UserParams = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    profile: ProfileParams;
    history: HistoryParams;
    relation: RelationParams;
    achievement: AchievementParams;
};

export type ProfileParams = {
    id : number
    score: number;
    los: number;
    win: number;
};

export type HistoryParams = {
    id:number;
    user: UserParams;
    date:Date;
    userCompetitor:UserParams;
};

export type RelationParams = {
    id: number;
    status: string;
    friend: UserParams;
    user: UserParams;
};

export type AchievementParams = {
    id: number;
    type: string;
    description: string;
    user: UserParams;
};

export interface IAuthenticate {
  token: string;
  user: User;
}