import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  ngOnInit() {
    this.activaLogout();
  }

  constructor(private usersService: UsersService) { }

  activaLogout() {
    this.usersService.logout();
    setTimeout(() => {
      this.usersService.redirToIndex();
    },
      500);
  }

}
