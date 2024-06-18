import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  constructor(public usersService: UsersService) {  }

  logueado: any;

  logout() {
    this.usersService.logout();
  }

  async ngOnInit() {
    this.logueado = await this.usersService.isUserLogged();
  }

}