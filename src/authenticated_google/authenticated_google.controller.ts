import {
    Controller,
    Post,
    ClassSerializerInterceptor, UseInterceptors, Body, Req,
  } from '@nestjs/common';
  import { AuthenticatedGoogleService } from './authenticated_google.service';
  import { Request } from 'express';
import TokenVerificationDto from './token_verification.dto';
  
  @Controller('google-authentication')
  export class AuthenticatedGoogleController {
    constructor(
      private readonly authenticatedGoogleService: AuthenticatedGoogleService
    ) {
    }
  
    @Post()
    async authenticate(@Body() tokenData: TokenVerificationDto, @Req() request: Request) {
      const email: String  = await this.authenticatedGoogleService.authenticate(tokenData.token);
      return email;
    }
  }