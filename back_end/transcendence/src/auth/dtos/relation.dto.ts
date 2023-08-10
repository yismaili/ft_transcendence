import { User } from "src/typeorm/entities/User.entity";

export interface RelationDto {
    id: number;
    status: string;
    friend: User;
    // user: User
}