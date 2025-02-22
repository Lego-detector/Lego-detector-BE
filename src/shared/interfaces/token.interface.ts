export interface ITokenPayload {
  sub: string;
}

export interface ICredentials {
  accessToken: string;
  refreshToken?: string;
}