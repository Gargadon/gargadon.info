import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(public userService: UsersService, public router: Router) { }

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      data => {
        this.userService.setToken(data.token);
        setTimeout(() => {
          this.userService.redirToIndex();
        },
          500);
      },
      error => {
        console.log(error);
      });
  }

}
