import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import ListTodo from '../../models/listtodo.model';
import { ListtodoService } from '../../services/listtodo.service';
import ToDo from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-listdetail',
  templateUrl: './listdetail.component.html',
  styleUrls: ['./listdetail.component.scss']
})
export class ListdetailComponent implements OnInit {
  @Input() todo: ToDo;
  list: ListTodo;
  todos: ToDo[] = [];
  selectedTodo: ToDo;
  constructor(
      private route: ActivatedRoute,
      private listSVC: ListtodoService,
      private todoSVC: TodoService,
      private location: Location
  ) { }

  ngOnInit() {
      this.list = new ListTodo();
      this.todos = [new ToDo()];
      this.todo = new ToDo();
      this.getList();
      this.getTodos();
  }
  getList(){
      const id = this.route.snapshot.paramMap.get("listId");
      this.listSVC.getList(id).subscribe((list)=>{
          this.list = list.obj[0];
      });
  }
  getTodos(){
      const id = this.route.snapshot.paramMap.get("listId");
      this.todoSVC.getTodosListId(id, "listdetail").subscribe((todos)=>{
          this.todos = todos.obj;
      })
  }
  add(td: ToDo): void{
      if(!td.title.trim()){return;}
      if(!td.desc.trim()){return;}
      this.todo = td;
      let id = this.list._id;
      this.todo.idList = id;
      this.todoSVC.createTodo(id, this.todo)
        .subscribe((t)=>{
          this.todos.push(t.obj);
        });
  }
  update(td: ToDo): void{
      console.log(td)
      if(td.status)
        td.status = false;
      else
        td.status = true;
    this.todoSVC.editTodo(this.list._id, td).subscribe();
  }
  delete(td: ToDo): void{
      let id = this.list._id;
      this.todos = this.todos.filter(t=> t !== td);
      this.todoSVC.deleteTodo(id, td).subscribe();
  }
}
