import { User } from "src/typeorm/entities/User.entity";

export interface HistoryDto {
    id: number;
    date: Date;
    resulteOfCompetitor: number;
    resulteOfUser: number;
    user: User;
    userCompetitor: User;
  }
