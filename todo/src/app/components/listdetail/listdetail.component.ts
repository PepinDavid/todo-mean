import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import ListTodo from '../../models/listtodo.model';
import { ListtodoService } from '../../services/listtodo.service';
import ToDo from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { UploadService } from '../../services/upload.service';

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
  dbclick = false;
  elementClicked = "";
  selectedFiles: FileList;
  currentFileUpload: File;
  filesList: Array<Object> = [];
  constructor(
      private route: ActivatedRoute,
      private listSVC: ListtodoService,
      private todoSVC: TodoService,
      private location: Location,
      public uploadSVC: UploadService
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
      this.listSVC.getList(id).subscribe((list: any)=>{
          if(list.hasOwnProperty('obj'))
            this.list = list.obj[0];
      });
  }
  getTodos(){
      const id = this.route.snapshot.paramMap.get("listId");
      this.todoSVC.getTodosListId(id, "listdetail").subscribe((todos: any)=>{
          if(todos.hasOwnProperty('obj')){
              todos.obj.forEach((o)=>{
                  o.classTitle = o.title.trim().split(" ").join("-")
                  o.classDesc = o.desc.trim().split(" ").join("-")
                  return o;
              });
              this.todos = todos.obj;
          }
      })
  }
  add(td: ToDo): void{
      if(!td.title.trim()){return;}
      if(!td.desc.trim()){return;}
      this.todo = td;
      let id = this.list._id;
      this.todo.idList = id;
      this.todoSVC.createTodo(id, this.todo)
        .subscribe((t: any)=>{
          this.todos.push(t.obj);
          td.title = "";
          td.desc = "";
        });
  }
  updateCheckBox(td: ToDo): void{
      if(td.status)
        td.status = false;
      else
        td.status = true;
    this.todoSVC.editTodo(this.list._id, td)
        .subscribe((t: any) =>{
        });
  }
  updateTodo(td: ToDo): void{
    this.todoSVC.editTodo(this.list._id, td)
        .subscribe((t: any) =>{
            console.log(t)
        });
  }
  delete(td: ToDo): void{
      let id = this.list._id;
      this.todos = this.todos.filter(t=> t !== td);
      this.todoSVC.deleteTodo(id, td).subscribe();
  }

  //events
  updateCell(e, td: ToDo): void{
      let el = e.path[0];
      if(e.keyCode == 13){
          if($(el).attr("class").indexOf("todoTitle") > -1){
              td.title = el.innerText;
              this.todoSVC.editTodo(this.list._id, td).subscribe(t => console.log(t));
          }else{
              td.desc = el.innerText;
              this.todoSVC.editTodo(this.list._id, td).subscribe(t => console.log(t));
          }
      }
  }
}
