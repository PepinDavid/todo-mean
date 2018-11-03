import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { ListtodoService } from '../../services/listtodo.service';
import ToDo from '../../models/todo.model';
import ListTodo from '../../models/listtodo.model';
import { TodoService } from '../../services/todo.service';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-tododetail',
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.scss']
})
export class TododetailComponent implements OnInit {
  @Input() todo: ToDo;
  list: ListTodo;
  selectedFiles: FileList;
  currentFileUpload: File;
  filesList: Array<Object> = [];
  constructor(
      private route: ActivatedRoute,
      private todoSVC: TodoService,
      private listSVC: ListtodoService,
      private uploadSVC: UploadService
  ) { }

  ngOnInit() {
      this.todo = new ToDo();
      this.getList();
      this.getTodo();
  }
  getList(){
      const id = this.route.snapshot.paramMap.get("listId");
      this.listSVC.getList(id).subscribe((list: any)=>{
          if(list.hasOwnProperty('obj'))
            this.list = list.obj[0];
      });
  }
  getTodo(){
      const idList = this.route.snapshot.paramMap.get("listId");
      const id = this.route.snapshot.paramMap.get("todoId");
      this.todoSVC.getTodo(idList, id).subscribe((todos: any)=>{
          if(todos.hasOwnProperty('obj')){
              this.todo = todos.obj[0];
              this.todo.filesOriginal = [];
              this.getFiles(this.todo);
          }
      });
  }
  updateTodo(td: ToDo): void{
    this.todoSVC.editTodo(td.idList, td)
        .subscribe((t: any) =>{
            t.filesOriginal = [];
            this.todo = t.obj;
            this.getFiles(this.todo);
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
  onFileChange(file: FileList){
        this.selectedFiles = file;
  }
  uploadFile(todo: ToDo): void{
        this.currentFileUpload = this.selectedFiles.item(0);
        this.uploadSVC.uploadTodoFile(this.currentFileUpload, todo._id)
          .subscribe((res)=>{
              let id = res.obj._id;
              if(todo.files)
                  todo.files.push(id);
              else{
                  todo.files = [id];
              }
              this.updateTodo(todo);
            }, (error)=>{
                console.log(error)
            })
  }
  getFiles(todo: ToDo): void{
        if(todo.files.length > 0 ){
            this.uploadSVC.getFilesByTodo(todo._id).subscribe((files: any)=>{
                let filesList: Array<Object> = [];
                if(files){
                    for(let i = 0; i < files.length; i++){
                        let obj = {
                            id: files[i].id,
                            filename: files[i].filename,
                            originalname: files[i].originalname,
                            contentType: files[i].contentType,
                            classFile: files[i].originalname.split(' ').join(''),
                            isImage: (files[i].contentType.indexOf('image') > -1)?true:false,
                            srcImg: ""
                        }
                        console.log(obj)
                        this.imgDisplay(obj)
                        filesList[i] = obj
                    }
                    todo.filesOriginal = filesList;
                }
            });
        }
  }
  download(id, contentType, originalname) {
     this.uploadSVC.downloadFile(id).subscribe(
        (blob) => {
          const file = new Blob([blob], { type: contentType });
          saveData(file, originalname);
        }
     );
  }
  removeFile(id){
    let self = this
    this.uploadSVC.removeFile(id).subscribe(
        (res)=>{
            console.log(res)
            self.todo.files = self.todo.files.filter(f => f === id);
            self.updateTodo(self.todo);
        }
    )
  }
  imgDisplay(obj){
      this.uploadSVC.downloadFile(obj.id).subscribe(
          (blob) => {
          const file = new Blob([blob], { type: obj.contentType });
          display(file, obj);
        }
      );
  }
}

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    return function (data, fileName) {
        var url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function display(data, obj) {
    let reader = new FileReader();
     reader.readAsDataURL(data);
     reader.onloadend = function() {
         let base64data = reader.result;
         obj.srcImg = base64data;
     }
}
