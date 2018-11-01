import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs'; //like Promise or CallBack;
import { catchError, map, tap } from 'rxjs/operators';
//without "Observable", "Service" is synchronously but in real app, service
//must use a connection to a BDD server so this one is asynchronous
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessagesService } from './messages.service';
import ToDo from '../models/todo.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Token')
    }),
    withCredentials: true
}

@Injectable()
export class TodoService {

  api_url = 'http://localhost:3000/api/lists';
  api_url_todos = 'http://localhost:3000/api/todos';
  listId = 0;

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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  //public
  getToDos(from: string): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.api_url_todos, httpOptions).pipe(
      tap(todo => this.log("Fetched ToDos")),
      catchError(this.handleError<ToDo[]>('getToDos', []))
    )
  }
  getTodosListId(id: string, from: string): Observable<ToDo[]> {
    let url = this.api_url;
    if (id)
      url += "/" + id + "/todos";
    return this.http.get<ToDo[]>(url, httpOptions).pipe(
      tap( _ => this.log("Fetched ToDos idList: "+id)),
      catchError(this.handleError<ToDo[]>('getTodosListId', []))
    )
  }
  getTodo(listId: string, id: string): Observable<ToDo>  {
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/todos";
    let getUrl = url + "/" + id;
    return this.http.get<ToDo>(getUrl, httpOptions).pipe(
      tap(todo => this.log("Get todo id: " + todo._id)),
      catchError(this.handleError<ToDo>('getTodo'))
    );
  }
  createTodo(listId: string, todo: ToDo): Observable<any> {
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/todos";
    return this.http.post<ToDo>(url, todo, httpOptions).pipe(
        tap(_ => this.log("Create todo " + todo.title)),
        catchError(this.handleError<ToDo>('createTodo'))
      );
  }
  editTodo(listId: string, todo: ToDo): Observable<any> {
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/todos";
    return this.http.put<ToDo>(url, todo, httpOptions).pipe(
      tap(_ => this.log("Updated todo id " + todo._id)),
      catchError(this.handleError<ToDo>('editTodo '))
    );
  }
  deleteTodo(listId: string, todo: ToDo | string): Observable<ToDo> {
    const id = (typeof todo === 'string') ? todo : todo._id;
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/todos";
    let deleteUrl = `${url}/${id}`;
    return this.http.delete<ToDo>(deleteUrl, httpOptions).pipe(
      tap(_ => this.log("Deleted todo id: " + id)),
      catchError(this.handleError<ToDo>('deleteTodo'))
    );
  }

}
