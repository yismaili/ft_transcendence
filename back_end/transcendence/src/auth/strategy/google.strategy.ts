import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // Constructor to inject the ConfigService and AuthService
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
    // Call the constructor of the PassportStrategy with configuration options
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'], // Optional: Define the scopes to request from Google
    });
  }

  // Override the 'validate' method to handle user validation
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
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
    done(null, user);
  }
}

