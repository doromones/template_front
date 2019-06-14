import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./models/user";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {AngularTokenService} from "angular-token";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private tokenService: AngularTokenService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signIn(login: string, password: string) {
    this.tokenService.signIn({
      login,
      password
    }).subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
    // return this.http.post<any>(`/users/authenticate`, {email, password})
    //   .pipe(map(user => {
    //     // login successful if there's a jwt token in the response
    //     if (user && user.token) {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //
    //     return user;
    //   }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
