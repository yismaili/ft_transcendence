import { Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthIntraGuard extends AuthGuard('42') {}