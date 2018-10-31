import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //like Promise or CallBack;
import { catchError, map, tap } from 'rxjs/operators';
//without "Observable", "Service" is synchronously but in real app, service
//must use a connection to a BDD server so this one is asynchronous
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessagesService } from './messages.service';
import Course from '../models/courses.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  api_url = 'http://localhost:3000/api/listscourse';
  api_url_course = 'http://localhost:3000/api/courses';
  listCourseId = 0;
  constructor(
      private http: HttpClient,
      private messageSVC: MessagesService
  ) { }
  private log(mess: string) {
    this.messageSVC.sendMessage(mess);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getCourses(from: string): Observable<Course[]> {
      return this.http.get<Course[]>(this.api_url_course, httpOptions).pipe(
        tap( _ => this.log("Fetched Courses")),
        catchError(this.handleError<Course[]>('getCourses', []))
      )
  }
  getCoursesListId(id: string, from: string): Observable<Course[]> {
    let url = this.api_url;
    if (id)
      url += "/" + id + "/courses";
    return this.http.get<Course[]>(url, httpOptions).pipe(
      tap( _ => this.log("Fetched Courses idListCourse: "+id)),
      catchError(this.handleError<Course[]>('getCoursesListId', []))
    )
  }
  getCourse(listId: string, id: string): Observable<Course>  {
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/courses";
    let getUrl = url + "/" + id;
    return this.http.get<Course>(getUrl, httpOptions).pipe(
      tap(course => this.log("Get course id: " + course._id)),
      catchError(this.handleError<Course>('getCourse'))
    );
  }
  createCourse(listId: string, course: Course): Observable<any> {
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/courses";
    return this.http.post<Course>(url, course, httpOptions).pipe(
        tap(_ => this.log("Create course " + course.title)),
        catchError(this.handleError<Course>('createCourse'))
      );
  }
  editCourse(listId: string, course: Course): Observable<any> {
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/courses";
    return this.http.put<Course>(url, course, httpOptions).pipe(
      tap(_ => this.log("Updated course id " + course._id)),
      catchError(this.handleError<Course>('editCourse '))
    );
  }
  deleteCourse(listId: string, course: Course | string): Observable<Course> {
    const id = (typeof course === 'string') ? course : course._id;
    let url = this.api_url;
    if (listId)
      url += "/" + listId + "/courses";
    let deleteUrl = `${url}/${id}`;
    return this.http.delete<Course>(deleteUrl, httpOptions).pipe(
      tap(_ => this.log("Deleted course id: " + id)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }
}
