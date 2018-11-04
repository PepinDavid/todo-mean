import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { ListtodoService } from '../../services/listtodo.service';
import ToDo from '../../models/todo.model';
import ListTodo from '../../models/listtodo.model';
import { TodoService } from '../../services/todo.service';
import { FilesService } from '../../services/files.service';


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
  constructor(
      private route: ActivatedRoute,
      private todoSVC: TodoService,
      private listSVC: ListtodoService,
      private FilesSVC: FilesService
  ) { }

  ngOnInit() {
      this.todo = new ToDo();
      this.list = new ListTodo();
      this.getList();
      this.getTodo();
  }
  getList(){
      const id = this.route.snapshot.paramMap.get("listId");
      this.listSVC.getList(id).subscribe((list: any)=>{
          if(list.hasOwnProperty('obj'))
            this.list = list.obj.docs[0];
      });
  }
  getTodo(){
      const idList = this.route.snapshot.paramMap.get("listId");
      const id = this.route.snapshot.paramMap.get("todoId");
      this.todoSVC.getTodo(idList, id).subscribe((todos: any)=>{
          if(todos.hasOwnProperty('obj')){
              this.todo = todos.obj.docs[0];
              this.todo.filesOriginal = [];
              this.getFiles();
          }
      });
  }
  updateTodo(): void{
      if(this.todo.title.trim() == "") return;
      if(this.todo.desc.trim() == "") return;
      this.todo.title = this.todo.title.trim();
      this.todo.desc = this.todo.desc.trim();
      delete this.todo.filesOriginal;
    this.todoSVC.editTodo(this.list._id, this.todo)
        .subscribe((t: any) =>{
            t.obj.filesOriginal = [];
            this.todo = t.obj;
            this.getFiles();
        });
  }
  updateCheckBox(): void{
      if(this.todo.status)
        this.todo.status = false;
      else
        this.todo.status = true;
    this.todoSVC.editTodo(this.list._id, this.todo)
        .subscribe((t: any) =>{
        });
  }
  onFileChange(file: FileList){
        this.selectedFiles = file;
  }
  uploadFile(): void{
        if(this.todo.title.trim() == "") return;
        if(this.todo.desc.trim() == "") return;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.FilesSVC.uploadAttachmentFile(this.currentFileUpload, this.todo._id)
          .subscribe((res: any)=>{
              let id = res.obj._id;
              if(this.todo.files.length > 0)
                  this.todo.files.push(id);
              else{
                  this.todo.files = [id];
              }
              this.updateTodo();
            }, (error)=>{
                console.log(error)
            })
  }
  getFiles(): void{
        if(this.todo.files.length > 0 ){
            this.FilesSVC.getFilesByAttachment(this.todo._id).subscribe((files: any)=>{
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
                        this.imgDisplay(obj)
                        filesList[i] = obj
                    }
                    this.todo.filesOriginal = filesList;
                }
            });
        }
  }
  download(id, contentType, originalname) {
     this.FilesSVC.downloadFile(id).subscribe(
        (blob: any) => {
          const file = new Blob([blob], { type: contentType });
          saveData(file, originalname);
        }
     );
  }
  removeFile(id){
    let self = this
    if(this.todo.files.indexOf(id) > -1){
        this.FilesSVC.removeFile(id).subscribe(
            (res)=>{
                console.log(res)
                self.todo.files = self.todo.files.filter(f => f !== id);
                self.updateTodo();
            }
        )
    }
  }
  imgDisplay(obj){
      this.FilesSVC.downloadFile(obj.id).subscribe(
          (blob: any) => {
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
