import { Component, OnInit } from '@angular/core';
import { ListtodoService } from '../../services/listtodo.service';
import  ListTodo from '../../models/listtodo.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lists: ListTodo[] = [];
  constructor(
      private listSVC: ListtodoService
  ) { }

  ngOnInit() {
      this.getAllLists();
  }
  getAllLists(): void{
      console.log(this.lists)
      this.listSVC.getAllLists("from dashboard")
        .subscribe((list)=>{
            if(list.hasOwnProperty("obj"))this.lists = list.obj;
        });
  }
}
