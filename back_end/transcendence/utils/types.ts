import { User } from "../src/typeorm/entities/User.entity";

export type CreateUserParams = {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
};

export type UpdateUserParams = {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
};

export type CreateUserProfileParams = {
    score: number;
    los: number;
    win: number;
};

export type CreateUserHistoryParams = {
    competitorId: number;
};

export type CreateUserRelationParams = {
    status: string;
};

export type CreateUserAchievementParams = {
    type: string;
    description: string;
};

export interface IAuthenticate {
  token: string;
  user: User;
}