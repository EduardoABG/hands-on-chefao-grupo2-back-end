import jwt_decode from "jwt-decode";
import fetch from 'cross-fetch';

type googleToken = {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean,
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export default class GoogleAuthService {
  private googleAPI: string = "https://oauth2.googleapis.com/tokeninfo";

  isGoogleToken(token: string): boolean {
    const decodedToken: googleToken = jwt_decode(token);

    if(decodedToken.iss && (decodedToken.iss === "https://accounts.google.com"
      || decodedToken.iss === "accounts.google.com")) {

      return true;

    } else {
      return false
    }
  }

  async checkToken(token: string): Promise<googleToken | false> {

    const apiRequest = await fetch(`${this.googleAPI}?id_token=${token}`, { "method": "GET" });
    const response = await apiRequest.json();

    if(response.error) {
      return false;
    }

    return response;
  }
}