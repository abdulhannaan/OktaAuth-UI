import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, RequiredValidator } from '@angular/forms';
import { SignUpRequestModel } from 'src/app/constants/models/signupModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password:[''],
    cnfrmPassword:['']

  });
  constructor(private formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup(){
    const modal: SignUpRequestModel = {
      profile : {
        login : this.signupForm.value.email??'',
        firstName: this.signupForm.value.firstName??'',
        lastName: this.signupForm.value.lastName??'',
        email: this.signupForm.value.email??''
      },
      credentials:{
        password:{
          value :this.signupForm.value.password??''
        }
      }
      };
    this.authService.signup(modal).subscribe((resp)=>{
debugger
    });
  }
}
