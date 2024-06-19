import { Component } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-login',
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
    // = await this.usersService.isUserLogged();
    this.infoLogin = await this.usersService.getUser();
    this.logueado = this.infoLogin?.logged;
    this.userID = this.infoLogin?.data?.[0]?.id;
    this.userName = this.infoLogin?.data?.[1]?.username;
    this.userMail = this.infoLogin?.data?.[2]?.email;
    this.avatarUser = this.infoLogin?.data?.[3]?.avatar;
  }
}
