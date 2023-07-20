import { SetMetadata } from '@nestjs/common';
// custom decorator for role-based authorization
export const Roles = (...args: string[]) => SetMetadata('roles', args); //set metadata on the decorated element the key is "roles" and the value is the array of roles
//(...args: string[]): The ...args syntax allows the decorator to receive multiple arguments and store them in an array named args.

//npx nest g d auth/roles 