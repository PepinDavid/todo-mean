import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //like Promise or CallBack;
import { catchError, map, tap } from 'rxjs/operators';

//without "Observable", "Service" is synchronously but in real app, service
//must use a connection to a BDD server so this one is asynchronous
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessagesService } from './messages.service';
import User from '../models/user.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Token')
    }),
    withCredentials: true
}
const httpLogin = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  api_url = 'http://localhost:3000';
  userUrl = this.api_url+"/api/user";
  nbPage: number = 1;
  constructor(
      private http: HttpClient,
      private messageSVC: MessagesService
  ) { }
  private log(mess: string){
      this.messageSVC.sendMessage(mess);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  setnbPage(nb: number){
      this.nbPage = nb;
  }
  getUsers(): Observable<User[]>{
      return this.http.get<User[]>(this.userUrl+"?page="+this.nbPage, httpOptions).pipe(
          tap( _ => this.log('Fetched users')),
          catchError(this.handleError<User[]>("getUsers", []))
      );
  }
  getMe(): Observable<User>{
      console.log(this.userUrl+"/me")
      return this.http.get<User>(this.userUrl+"/me", httpOptions).pipe(
          tap( _ => this.log('Fetched users')),
          catchError(this.handleError<User>("getUser"))
      );
  }
  updateUser(user: User): Observable<User> {
      return this.http.put<User>(this.userUrl, user, httpOptions).pipe(
          tap( _ => this.log("Updated user")),
          catchError(this.handleError<User>("updateUser"))
      )
  }
  updatePwd(pwd: string): Observable<User> {
      return this.http.put<User>(this.userUrl, {password: pwd}, httpOptions).pipe(
          tap( _ => this.log("Updated password")),
          catchError(this.handleError<User>("updatePwd"))
      )
  }
  login(user: User): Observable<User>{
      let urlLog = this.userUrl+"/login";
      return this.http.post<User>(urlLog, user, httpLogin).pipe(
          tap( _ => this.log("login")),
          catchError(this.handleError<User>("login"))
      );
  }
  loggout(): Observable<any>{
      return this.http.get<any>(this.userUrl+"/loggout", httpOptions).pipe(
          tap( _ => this.log("loggout")),
          catchError(this.handleError<any>("logout"))
      );
  }
  createUser(user: User): Observable<User>{
      return this.http.post<User>(this.userUrl, user, httpLogin).pipe(
          tap( _ => this.log("createUser")),
          catchError(this.handleError<User>("createUser"))
      )
  }
}
