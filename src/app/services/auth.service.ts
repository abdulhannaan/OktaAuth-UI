import { Injectable } from '@angular/core';
import { loginRequestModel } from '../constants/models/loginModel';
import { HttpClient } from '@angular/common/http'
import { SignUpRequestModel } from '../constants/models/signupModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(model:loginRequestModel){

    let url = 'https://localhost:44389/token/create';
    return this.http.post(url,model);

  }

  signup(model:SignUpRequestModel)
  {
    let url = 'https://localhost:44389/user/sign-up';
    return this.http.post(url,model);
  }

}
