import { Module } from '@nestjs/common';
import { AuthenticatedGoogleController } from "./authenticated_google.controller";
import { AuthenticatedGoogleService } from './authenticated_google.service';

@Module({
  imports:  [],
  providers: [AuthenticatedGoogleService],
  controllers: [AuthenticatedGoogleController],
})
export class GoogleAuthenticationModule {}