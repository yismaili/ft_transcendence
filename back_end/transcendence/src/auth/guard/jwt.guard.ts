import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() //protect end-point 
export class JwtAuthGuard extends AuthGuard('jwt') {}