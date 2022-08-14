import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginRequestModel } from 'src/app/constants/models/loginModel';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  public loginModel!: loginRequestModel;
  public errorMessage = "";

  constructor(private formBuilder: FormBuilder, private router: Router,  private authService: AuthService,) {
    this.setFormDefault();


  }
  ngOnInit(): void {
  }
  setFormDefault() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: ['', [Validators.required]],
    });

  }
  get f() { return this.loginForm.controls; }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((resp: any) => {
      if (resp) {
        this.gotoUser();
      }
      else {
        this.errorMessage = "Please enter Valid Username and Password.";
      }
    });
  }

  gotoUser() {
    this.router.navigate(['/user']);
  }
}

