
// roles 
export enum Role{
    Admin = 'admin',
    User = 'user'
}
// info of user
type User = {
    id: string; // Ensure the type of id is string
    userName: string;
    password: string;
    role: Role;
  };
  
// if user logged 
export interface IAuthenticate {
    user:User;
    token:string;
}