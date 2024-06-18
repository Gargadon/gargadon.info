import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  logueado:any;
  async ngOnInit() {
    this.usersService.logueado = await this.usersService.isUserLogged();
    this.logueado = await this.usersService.isUserLogged();
  }

  constructor(public usersService: UsersService) {

    
  }
}




