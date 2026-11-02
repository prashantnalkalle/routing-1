import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { login, userRole } from 'src/module/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Auth_url = environment.Auth_url
  constructor(
    private _http:HttpClient
  ) { }

  signup(user:any):Observable<any> {
    let signupurl =`${this.Auth_url}/api/auth/register`

    return this._http.post(signupurl,user)

  }

  login(usercred:any):Observable<login> {
    let loginurl =`${this.Auth_url}/api/auth/login`
    return this._http.post<login>(loginurl,usercred)

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

  saveToken(token:string) {
    localStorage.setItem('token',token)
  }

  gettoken() {
    return localStorage.getItem('token')
  }

  getUserRole() {
    return localStorage.getItem('userRole')
  }

  isAuthenticated(): boolean {
    return !!this.gettoken();
  }

  saveUserRole(userRole:string) {
    localStorage.setItem('userRole',userRole)
  }
}
