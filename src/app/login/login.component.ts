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
  valido: boolean;

  constructor(public userService: UsersService, public router: Router) { }

  login() {
    this.valido = null;
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      data => {
        this.userService.setToken(data.token);
        if(this.userService.getTokenText() != 'undefined') {
          this.valido = true;
          setTimeout(() => {
            this.userService.redirToIndex();
          },
            800);
        }
        else {
          this.valido = false;
        }
      },
      error => {
        console.log(error);
        this.userService.logueado = false;
      });
  }

}
