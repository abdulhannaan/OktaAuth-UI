import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, RequiredValidator } from '@angular/forms';
import { loginRequestModel } from 'src/app/constants/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: [''],
    password: [''],

  });

  constructor(private authService: AuthService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  login()
  {
    const modal: loginRequestModel = {
    username : this.loginForm.value.username,
    password : this.loginForm.value.password
    };

    this.authService.login(modal).subscribe((resp)=>{

    }
      );
  }
}
