import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { GoogleAuthenticationModule } from './authenticated_google/authenticated_google.module';
import { UsersModule } from './user/user.module';
import { AuthenticatedGoogleService } from './authenticated_google/authenticated_google.service';
import { AuthenticatedGoogleController } from './authenticated_google/authenticated_google.controller';

@Module({
  imports: [GoogleAuthenticationModule, UsersModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
