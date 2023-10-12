import { User } from "src/typeorm/entities/User.entity";

export interface IAuthenticate {
  success: boolean;
  token: string;
  user: User;
}
