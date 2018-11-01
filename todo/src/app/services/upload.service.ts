import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs'; //like Promise or CallBack;
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from './messages.service';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': localStorage.getItem('Token')
  }),
  withCredentials: true,
  reportProgress: true
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  api_url = 'http://localhost:3000';
  fileUrl = this.api_url + "/api/collecfiles";
  constructor(
    private http: HttpClient,
    private messageSVC: MessagesService
  ) { }
  private log(mess: string) {
    this.messageSVC.sendMessage(mess);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  uploadTodoFile(files: File, todoId: string): Observable<any> {
    let formData: FormData = new FormData();
    let url: string = this.fileUrl+"/upload/"+todoId;

    formData.append("file", files, files.name);
    return this.http.post(url, formData, {headers: new HttpHeaders()}).pipe(
        tap( _ => this.log("file send")),
        catchError(this.handleError<null>("upload"))
    );
  }
  uploadFile(files: File): Observable<any> {
    let formData: FormData = new FormData();
    let url: string = this.fileUrl+"/upload/";

    formData.append("file", files, files.name);
    return this.http.post(url, formData, {headers: new HttpHeaders()}).pipe(
        tap( _ => this.log("file send")),
        catchError(this.handleError<null>("upload"))
    );
  }
  getFile(fileId: string): Observable<any> {
      return this.http.get(this.fileUrl+"/"+fileId);
  }
  getFiles(): Observable<any> {
      return this.http.get(this.fileUrl);
  }
  downloadFile(id: string): Observable<any>{
      return this.http.get(this.fileUrl+"/download/"+id,
      { responseType: 'blob' });
  }
}
