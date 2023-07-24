import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
    super({
        clientID: configService.get<string>('INTRA_CLIENT_ID'),
        clientSecret: configService.get<string>('INTRA_CLIENT_SECRET'),
        callbackURL: configService.get<string>('OAUTH_INTRA_REDIRECT_URL'),
        scope: ['write:jira-work read:jira-work read:jira-user offline_access read:me'], // Optional: Define the scopes to request from Google
      });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
   // Extract relevant user data from the profile received from Google
   const { name, emails, photos } = profile;

   // Create a user object with relevant data to be used for authentication or saving to the database
   const user = {
     email: emails[0].value,
     firstName: name.givenName,
     lastName: name.familyName,
     picture: photos[0].value,
     accessToken,
   };
   // Call the 'done' callback to complete the authentication process with the user data
  return(user);
  }
}
