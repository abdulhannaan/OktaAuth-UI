export interface loginRequestModel{
    username : string,
    password : string 
}

export class LoginResponse {
    sessionToken!: string;
    _embedded!: any;
  }