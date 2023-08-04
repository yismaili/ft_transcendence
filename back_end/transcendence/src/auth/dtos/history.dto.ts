import { User } from "src/typeorm/entities/User.entity";

export class HistoryDto{
    date: Date;
    userCompetitor: User;
}