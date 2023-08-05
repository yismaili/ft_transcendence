import { User } from "src/typeorm/entities/User.entity";

export interface HistoryDto {
  id: number;
  userCompetitor: User;
}