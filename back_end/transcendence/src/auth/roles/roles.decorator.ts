import { SetMetadata } from '@nestjs/common';
// roles dokorater protict thes link
export const Roles = (...args: string[]) => SetMetadata('roles', args);
//npx nest g d auth/roles 