import { User } from "src/typeorm/entities/User.entity";

// enumeration representing different user roles
export enum Role{
    Admin = 'admin',
    User = 'user'
}
//the information of a user 
type user = {
    id: string; // Ensure the type of id is string
    userName: string;
    password: string;
    role: Role;
  };
  
//represents the data returned when a user is successfully authenticated 


export interface IAuthenticate {
  token: string;
  user: User; // Use the renamed 'UserEntity' type
}

