import { User } from "src/typeorm/entities/User.entity";

export interface RelationDto {
    status: string;
    friend: User;
    user: User
}