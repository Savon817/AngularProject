import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";

import { User } from "./user.model";
import { UserService } from "./user.service";

//Firebase Crendentials
const SIGNUP_KEY = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAklE7r4FP7CvxWyMmJ3YKXBE5pA6pTocU';
const LOGIN_KEY = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAklE7r4FP7CvxWyMmJ3YKXBE5pA6pTocU';

//Spotify Credentials
const CLIENT_ID = '86c3692b956f4c72a651bbc1f954c2ef';
const CLIENT_SECRET = '1d009847f7a24d009a17e5490c119cc2';
const REDIRECT_URI = 'http://localhost:4200/musiclist/callback/';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private baseUrl = 'http://localhost:3000/api/v1/users/'

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private userService: UserService){}

  setCurrentUser(user: User){
    this.user.next(user);
  }

  public get currentUser(): User {
    return this.user.value;
  }

  signup(user: any){
    return this.http.post(this.baseUrl + 'create', user);
  }


  login(user: any){
    return this.http.post(this.baseUrl + 'login', user);
  }

  setToken(token: any){
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(){
    const token = localStorage.getItem('token');
    if(token != null){
      return JSON.parse(token)
    } else {
      return null;
    }
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  autoLogin(){
    const token = this.getToken();
    if(!token){
      return;
    }

    this.http.get(this.baseUrl + 'me', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }).subscribe((res: any) => {
      if(res.success){
        this.userService.setCurrentUser(res.payload.user);
      }
    })
  }

  // private headers = new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  //   // 'Access-Control-Allow-Credentials': 'true',
  //   // 'Content-Type' : 'application/x-www-form-urlencoded',
  //   // 'Authorization' : `Basic<base64 encoded ${CLIENT_ID}:${CLIENT_SECRET}`
  // })


  // spotifyLogin(){
  //   return this.http.get(
  //     'https://accounts.spotify.com/authorize',
  //     {params: {
  //       'client_id' : CLIENT_ID,
  //       'response_type' : 'code',
  //       'redirect_uri' : REDIRECT_URI,
  //       'scope' : 'user-read-private user-read-email',
  //       'show_dialog': true },
  //       headers: this.headers
  //     }).pipe(catchError((err) => {
  //       console.log(err);
  //       throw err;
  //     })).subscribe(
  //       response => {
  //         console.log(response)
  //       }
  //     );
  // }

  logout(){
    const token = this.getToken();

    if (token){
      this.http.delete(this.baseUrl + 'logout', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      }).subscribe((res:any) => {
        if(res.success){
          this.setToken(null);
          this.userService.setCurrentUser(null);
          this.router.navigate(['/login']);
        }
      })
    }
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred'
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
    }
}
