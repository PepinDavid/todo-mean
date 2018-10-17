import { Component, OnInit, Input } from '@angular/core';

import ListTodo from '../../models/listtodo.model';
import { ListtodoService } from '../../services/listtodo.service';

@Component({
  selector: 'app-listtodo',
  templateUrl: './listtodo.component.html',
  styleUrls: ['./listtodo.component.scss']
})
export class ListtodoComponent implements OnInit {
  @Input() list: ListTodo;
  lists: ListTodo[] = [];
  selectedList: ListTodo;

  constructor(
      private listSVC: ListtodoService
  ) { }

  ngOnInit() {
      this.list = new ListTodo();
      this.getLists();
  }

  getLists():void {
      this.listSVC.getAllLists("from listtodo component")
        .subscribe((list)=>{if(list.hasOwnProperty("obj"))this.lists = list.obj});
  }

  onSelect(list: ListTodo): void {
      this.selectedList = list;
  }
  add(l: ListTodo): void{
      let titre = l.title.trim();
      let descr = l.desc.trim();
      if(!titre){return;}
      if(!descr){return;}
      let list = new ListTodo();
      this.list.title = titre;
      this.list.desc = descr;
      this.listSVC.addList(this.list)
        .subscribe( list => {
            this.lists.push(list.obj);
        });
  }
  delete(list: ListTodo){
      this.lists = this.lists.filter(l=> l !== list);
      this.listSVC.deleteList(list).subscribe();
  }
  clearList(){
      this.list = new ListTodo();
  }
}