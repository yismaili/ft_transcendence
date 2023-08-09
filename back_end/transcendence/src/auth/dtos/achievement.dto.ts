import { User } from "src/typeorm/entities/User.entity";

export class AchievementDto{
    id: number;
    type: string;
    description: string;
    user: User
}