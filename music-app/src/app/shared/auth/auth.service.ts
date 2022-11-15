import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { User } from "./user.model";

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

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router){}

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(SIGNUP_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    }))
  }


  login(email: string, password: string){
    return this.http.post<AuthResponseData>(LOGIN_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    }))
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Content-Type' : 'application/x-www-form-urlencoded',
    // 'Authorization' : `Basic<base64 encoded ${CLIENT_ID}:${CLIENT_SECRET}`
  })


  spotifyLogin(){
    return this.http.get(
      'https://accounts.spotify.com/authorize',
      {params: {
        'client_id' : CLIENT_ID,
        'response_type' : 'code',
        'redirect_uri' : REDIRECT_URI,
        'scope' : 'user-read-private user-read-email',
        'show_dialog': true },
        headers: this.headers
      }).pipe(catchError((err) => {
        console.log(err);
        throw err;
      })).subscribe(
        response => {
          console.log(response)
        }
      );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token:string,
    expiresIn: number
  ){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
