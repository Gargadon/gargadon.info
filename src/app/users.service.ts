import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }

  logueado: boolean;

  login(user: any): Observable<any> {
    return this.http.post("https://www.gargadon.info/api/login.php", user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }

  getToken() {
    var token = {
      "token": this.cookies.get("token")
    };
    return token;
  }

  getTokenText() {
    return this.cookies.get("token");
  }

  isLogged(token: any): Observable<any> {
    return this.http.post("https://www.gargadon.info/api/is_logged.php", token);
  }

  getUser() {
    return this.http.get("https://www.gargadon.info/api/user.php?id=1");
  }

  logout() {
    this.cookies.delete("token");
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  async isUserLogged() {
    var source$ = this.isLogged(this.getToken());
    var finalNumber = await lastValueFrom(source$);
    return finalNumber.logged;
  }

  reloadPage() {
    window.location.reload();
  }

}
