import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private productService: ProductService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<any>('http://localhost:4200/users/authenticate', {
        username,
        password,
      })
      .pipe(
        map((response) => {
          if (response.status == 200) {
            localStorage.setItem('username', JSON.stringify(username));
            localStorage.setItem('password', JSON.stringify(password));
            var user = new User();
            user.username = JSON.stringify(username);
            user.password = JSON.stringify(password);
            this.currentUserSubject.next(user);
            return response;
          } else {
            return null;
          }
        })
      );
  }

  loggedIn() {
    return !!localStorage.getItem('username');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
