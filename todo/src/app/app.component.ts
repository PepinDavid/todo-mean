import { Response } from '@angular/http';
import { Router } from '@angular/router';
import ListTodo from './models/listtodo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  isLogin(){
      return (localStorage.getItem('Token') == null)?
        false:true;
  }
  logout(){
     localStorage.removeItem('Token');
     this.router.navigate(['login']);
  }
  title = 'My Todo';
}
