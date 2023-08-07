import { User } from "src/typeorm/entities/User.entity";

export class AchievementDto{
    type: string;
    description: string;
    user: User
}