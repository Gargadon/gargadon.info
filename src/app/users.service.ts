import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient, private cookies: SsrCookieService, private router: Router) { }

  logueado: boolean;

  login(user: any): Observable<any> {
    return this.http.post("https://www.gargadon.info/api/login.php", user);
    if(this.getToken()) {
      this.logueado = true;
      console.log(this.logueado);
    }
  }

  setToken(token: string) {
    var expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 7);
    this.cookies.set("token", token, { expires: expiredDate, sameSite: 'Lax' });
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

  async getUser() {
    var source$ = this.isLogged(this.getToken());
    var finalNumber = await lastValueFrom(source$);
    return finalNumber;
  }

  async logout() {
    this.cookies.set("token", "", { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), sameSite: 'Lax' });
  }

  async isUserLogged() {
    var source$ = this.isLogged(this.getToken());
    var finalNumber = await lastValueFrom(source$);
    return finalNumber.logged;
  }

  reloadPage() {
    window.location.reload();
  }

  redirToIndex() {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

}
