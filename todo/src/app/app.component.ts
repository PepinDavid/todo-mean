import { Response } from '@angular/http';
import { ListtodoService } from './services/listtodo.service';
import ListTodo from './models/listtodo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private listService: ListtodoService
  ) { }

  lists: ListTodo[];

  ngOnInit(): void {
    // this.listService.getAllLists("from DB")
    //   .subscribe(list => {
    //     this.lists = list.obj
    // });
  }



  title = 'app';


}
