import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-42';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
    super({
        clientID: configService.get<string>('INTRA_CLIENT_ID'),
        clientSecret: configService.get<string>('INTRA_CLIENT_SECRET'),
        callbackURL: configService.get<string>('OAUTH_INTRA_REDIRECT_URL'),
        scope: ['public']
      });
  }

  async validate(accessToken: string, refreshToken: string, profile: any,  done: VerifyCallback) {
   const user = {
    firstName: profile.name.givenName, 
    lastName: profile.name.familyName, 
    email: profile.emails?.[0]?.value,
    picture: profile._json.image.link,
    accessToken,
   };
  done(null, user);
  }
}
