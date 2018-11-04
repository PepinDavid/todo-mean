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
  isVisible: boolean = false;
  nbPage: number = 1;
  nbTotal: number = 100;
  constructor(
      private listSVC: ListtodoService
  ) { }

  ngOnInit() {
      this.list = new ListTodo();
      this.getLists();
  }
  formVisible(){
      if(this.isVisible)
        this.isVisible = false;
      else
        this.isVisible = true;
  }
  getLists():void {
      this.listSVC.setnbPage(this.nbPage);
      this.listSVC.getAllLists("from listtodo component")
        .subscribe((list: any)=>{
            if(list.hasOwnProperty("obj")){
                this.lists = list.obj.docs;
                this.nbTotal = list.obj.pages;
            }
        });
  }
 updateListTodo(l: ListTodo): void{
     if(l.status)
        l.status = false;
     else
        l.status = true;
    this.listSVC.updateList(l).subscribe();
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
        .subscribe( (list: any) => {
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
  prevPage(){
      if(this.nbPage > 1){
          this.nbPage--;
          this.listSVC.setnbPage(this.nbPage);
          this.getLists();
      }
  }
  nextPage(){
      if(this.nbPage < this.nbTotal){
          this.nbPage++;
          this.listSVC.setnbPage(this.nbPage);
          this.getLists();
      }
  }
}
