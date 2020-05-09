import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrlAuth = environment.apiUrl + 'auth/';
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  logIn(model) {
    return this.http.post(this.baseUrlAuth + 'login', model).pipe(
      map((response: any) => {
        const token = response;
        if(token) {
          localStorage.setItem('token', token.token);
          this.decodedToken = this.jwtHelper.decodeToken(token.token);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUsername() : string {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.Username;
  }

  getStaffId() : number {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return +decodedToken.StaffId;
  }
}
