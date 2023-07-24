import { Injectable } from "@nestjs/common";
import { AuthGuard } from "passport-42";

@Injectable()
export class IntraGuard extends AuthGuard('42') {}