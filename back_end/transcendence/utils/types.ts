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
    user: User;
    date:Date;
    userCompetitor:User;
};

export type RelationParams = {
    id: number;
    status: string;
    friend: User;
    user: User;
};

export type AchievementParams = {
    id: number;
    type: string;
    description: string;
    user: User;
};

export interface IAuthenticate {
  token: string;
  user: User;
}