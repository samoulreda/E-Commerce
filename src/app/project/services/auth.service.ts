import { resetPassword } from '../interfaces/resetPassword';
import { verifyCode } from '../interfaces/verifyCode';
import { forget } from '../interfaces/forget';
import { login } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { register } from '../interfaces/register';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    afterNextRender(() => {
      if (localStorage.getItem('userToken')) {
        this.getUser();
        const page = localStorage.getItem('page');
        router.navigate([page]);
      }
    })
  }

  handelRegister(data: register): Observable<any> {
    return this.http.post(environment.url + 'auth/signup', data);
  }

  handelLogin(data: login): Observable<any> {
    return this.http.post(environment.url + 'auth/signin', data);
  }

  getUser() {
    const userData = jwtDecode(JSON.stringify(localStorage.getItem('userToken')));
    this.user.next(userData);
  }

  forgetpassword(data: forget): Observable<any> {
    return this.http.post(environment.url + 'auth/forgotPasswords', data);
  }

  verifyResetCode(data: verifyCode): Observable<any> {
    return this.http.post(environment.url + 'auth/verifyResetCode', data);
  }

  resetPassword(data: resetPassword): Observable<any> {
    return this.http.put(environment.url + 'auth/resetPassword', data);
  }
}
