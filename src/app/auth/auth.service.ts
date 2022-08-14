import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject, map, catchError, of } from "rxjs";
import { Delete_Login_Session, Login_Token_Create } from "../constants/api-constants/endpoint.constants";
import { loginRequestModel, LoginResponse } from "../constants/models/loginModel";
import { SignUpRequestModel } from "../constants/models/signupModel";
import { EnvService } from "../services/enviroment.service";



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private UserContextVMCache$!: Observable<any>;
  private currentUserSubject: BehaviorSubject<LoginResponse>;
  private currentUserTokentSubject: BehaviorSubject<string>;
  privilegesList: any;
  constructor(
    private http: HttpClient,
    private envService: EnvService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUserTokentSubject = new BehaviorSubject<string>(
      localStorage.getItem('currentToken')!
    );
  }

  public login(model: loginRequestModel): Observable<boolean> {

    this.clearStorage();
    this.UserContextVMCache$ = this.http
      .post<LoginResponse>(this.envService.baseUrl + Login_Token_Create, model)
      .pipe(
        map((uCtx) => {
          if(uCtx._embedded !=null){
            localStorage.setItem('currentUser', JSON.stringify(uCtx['_embedded']));
            localStorage.setItem('currentToken', uCtx['sessionToken']);
            this.currentUserSubject = new BehaviorSubject<LoginResponse>(
              JSON.parse(localStorage.getItem('currentUser')!)
            );
            this.currentUserTokentSubject = new BehaviorSubject<string>(
              localStorage.getItem('currentToken')!
            );
            return true;
          }
          else{
            return false;
          }

        }),
        catchError((err) => {
          return of(false);
        })
      );

    return this.UserContextVMCache$;
  }

  public getCurrentUser() {
    if (this.currentUserSubject.value) {
      return this.currentUserSubject.value;
    }
    else {
      //.logout();
      return this.currentUserSubject.value;
    }
  }

  public getCurrentToken() {
    if (this.currentUserSubject.value) {
      return this.currentUserTokentSubject.value;
    }
    else {
      //.logout();
      return this.currentUserTokentSubject.value;
    }
  }


  public handleAuthError(err?: any): Observable<any> {
    try {
    } catch (error) {
      console.error(
        'Loader still not initiated,stopping it causes this exception!'
      );
    }
    let errorMessage: string = 'ERROR:' + err.status + ' - ' + err.message;
    throw err;
  }


  clearStorage() {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
 
  signup(model: SignUpRequestModel) {
    let url =  this.envService.baseUrl +'user/sign-up';
    return this.http.post(url, model);
  }
  logout(id: any) {
    let url = this.envService.baseUrl + Delete_Login_Session + '/' + id;
    this.http.delete(url);
    this.clearStorage();
  }
}
