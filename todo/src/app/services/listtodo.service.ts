import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs'; //like Promise or CallBack;
import { catchError, map, tap } from 'rxjs/operators';
//without "Observable", "Service" is synchronously but in real app, service
//must use a connection to a BDD server so this one is asynchronous
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessagesService } from './messages.service';
import ListTodo from '../models/listtodo.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Token')
    }),
    withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class ListtodoService {

  api_url = 'http://localhost:3000';
  listTodoUrl = this.api_url+"/api/lists";
  nbPage: number = 1;
  constructor(
      private http: HttpClient,
      private messageSVC: MessagesService
  ) { }
  private log(mess: string) {
    this.messageSVC.sendMessage(mess);
  }
  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  setnbPage(nb: number){
      this.nbPage = nb;
  }
  getAllLists(from: string): Observable<ListTodo[]>{
      return this.http.get<ListTodo[]>(this.listTodoUrl+"?page="+this.nbPage, httpOptions).pipe(
          tap( _ => this.log('Fetched lists todos')),
          catchError(this.handleError<ListTodo[]>('getAllLists', []))
      )
  }
  getList(id: string): Observable<ListTodo>{
      const url = this.listTodoUrl+"/"+id;
      return this.http.get<ListTodo>(url, httpOptions).pipe(
          tap( _ => this.log("get List todo id: "+id)),
          catchError(this.handleError<ListTodo>('getList'))
      );
  }
  addList(list: ListTodo): Observable<ListTodo>{
      console.log(list)
      return this.http.post<ListTodo>(this.listTodoUrl, list, httpOptions).pipe(
          tap( _ => this.log("added new list todo")),
          catchError(this.handleError<ListTodo>('addList'))
      )
  }
  updateList(list: ListTodo): Observable<ListTodo>{
      return this.http.put<ListTodo>(this.listTodoUrl, list, httpOptions).pipe(
          tap( _ => this.log("Updated list todo id: "+list._id)),
          catchError(this.handleError<any>('updateList'))
      );
  }
  deleteList(list: ListTodo | string): Observable<ListTodo>{
      const id = typeof list === 'string' ? list : list._id;
      const url = this.listTodoUrl+"/"+id;
      console.log(id)
      return this.http.delete<ListTodo>(url, httpOptions).pipe(
          tap( _ => this.log("Deleted list todo id: "+id)),
          catchError(this.handleError<ListTodo>('deleteList'))
      );
  }
}
