import { Injectable, UnauthorizedException } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import User from '../user/user.entities';

@Injectable()
export class AuthenticatedGoogleService {
  oauthClient: Auth.OAuth2Client;
  constructor(
  ) {
    const clientID = "980333570664-36pq8dnvg82e1fb2naoql8l4ggc1c5vl.apps.googleusercontent.com";

    this.oauthClient = new google.auth.OAuth2(
      clientID,
    );
    
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token
    })

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient
    });

    return userInfoResponse.data;
  }

  async getCookiesForUser(user: User) {
    // const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
    // const {
    //   cookie: refreshTokenCookie,
    //   token: refreshToken
    // } = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    // await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    // return {
    //   accessTokenCookie,
    //   refreshTokenCookie
    // }
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException();
    }

    // const {
    //   accessTokenCookie,
    //   refreshTokenCookie
    // } = await this.getCookiesForUser(user);

    // return {
    //   accessTokenCookie,
    //   refreshTokenCookie,
    //   user
    // }
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;

    // const user = await this.usersService.createWithGoogle(email, name);

    // return this.handleRegisteredUser(user);
    return name;
  }

  async authenticate(token: string) : Promise<string> {
    console.log(token);
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
    //   const user = await this.usersService.getByEmail(email);

    //   return this.handleRegisteredUser(user);
    return email;
    } catch (error) {
      if (error.status !== 404) {
        throw new error;
      }

      return this.registerUser(token, email);
    }
  }
}