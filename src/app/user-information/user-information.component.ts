import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  userInformation: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userInformation = this.authService.getCurrentUser();
    console.log(this.userInformation.user.profile);
  }
  LogOut() {
    let userId = this.userInformation.user.id;
    this.authService.logout(userId);
  }
}
