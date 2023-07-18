// roles 
export enum Role{
    Admin = 'admin',
    User = 'user'
}
// info of user
type User = {
    id:string;
    userName:string;
    password:string;
    role:Role;
}
// if user logged 
export interface IAuthenticate {
    user:User;
    token:string;
}