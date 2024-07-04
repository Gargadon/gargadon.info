import { Component } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class Login2Component {

  constructor (private usersService:UsersService) {}

  infoLogin: any;
  userID: any;
  userName: any;
  userMail: any;
  avatarUser: any;
  logueado: boolean;

  async ngOnInit() {
    this.hola();
  }

  async hola() {
    this.infoLogin = await this.usersService.getUser();
    this.logueado = this.infoLogin?.logged;
    this.userID = this.infoLogin?.data?.id;
    this.userName = this.infoLogin?.data?.username;
    this.userMail = this.infoLogin?.data?.email;
    this.avatarUser = this.infoLogin?.data?.avatar;
  }
}
