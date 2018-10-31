import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //like Promise or CallBack;
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagesService } from './messages.service';
import ListCourse from '../models/listcourse.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class ListcourseService {
  api_url = 'http://localhost:3000';
  listTodoUrl = this.api_url+"/api/listscourse";
  constructor(
      private http: HttpClient,
      private messageSVC: MessagesService
  ) { }
  private log(mess: string) {
    this.messageSVC.sendMessage(mess);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getAllListsCourse(from: string): Observable<ListCourse[]>{
      return this.http.get<ListCourse[]>(this.listTodoUrl, httpOptions).pipe(
          tap( _ => this.log('Fetched lists todos')),
          catchError(this.handleError<ListCourse[]>('getAllListsCourse', []))
      )
  }
  getListCourse(id: string): Observable<ListCourse>{
      const url = this.listTodoUrl+"/"+id;
      return this.http.get<ListCourse>(url, httpOptions).pipe(
          tap( _ => this.log("get List todo id: "+id)),
          catchError(this.handleError<ListCourse>('getList'))
      );
  }
  addListCourse(list: ListCourse): Observable<ListCourse>{
      console.log(list)
      return this.http.post<ListCourse>(this.listTodoUrl, list, httpOptions).pipe(
          tap( _ => this.log("added new list todo")),
          catchError(this.handleError<ListCourse>('addList'))
      )
  }
  updateList(list: ListCourse): Observable<ListCourse>{
      return this.http.put<ListCourse>(this.listTodoUrl, list, httpOptions).pipe(
          tap( _ => this.log("Updated list todo id: "+list._id)),
          catchError(this.handleError<any>('updateList'))
      );
  }
  deleteListCourse(list: ListCourse | string): Observable<ListCourse>{
      const id = typeof list === 'string' ? list : list._id;
      const url = this.listTodoUrl+"/"+id;
      return this.http.delete<ListCourse>(url, httpOptions).pipe(
          tap( _ => this.log("Deleted list todo id: "+id)),
          catchError(this.handleError<ListCourse>('deleteList'))
      );
  }
}
