import { User } from "src/typeorm/entities/User.entity";

export class HistoryDto{
    user:User
    date: Date;
    userCompetitor: User;
}