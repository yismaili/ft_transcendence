import { User } from "src/typeorm/entities/User.entity";

export class RelationDto {
    status: string;
    userOne: User;
    userTwo: User;
}