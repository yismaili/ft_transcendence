import { User } from "src/typeorm/entities/User.entity";

export interface IAuthenticate {
  success: any;
  token: string;
  user: User;
}
