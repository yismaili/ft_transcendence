import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordHashingService {
    async hashPassword(password: string): Promise<string> {
        try {
          const hashedPassword = await argon2.hash(password);
          return hashedPassword;
        } catch (error) {
          throw new Error('Error hashing password---------------------');
        }
      }
    
      async verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
        try {
          const isPasswordValid = await argon2.verify(hashedPassword, password);
          return isPasswordValid;
        } catch (error) {
          throw new Error('Error verifying password');
        }
      }
}
