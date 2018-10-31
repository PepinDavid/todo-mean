import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  filesList: Array<Object> = [];
  constructor(
    public uploadSVC: UploadService
  ) { }
  ngOnInit() {
      this.getFiles();
  }
  onFileChange(file: FileList){
      this.selectedFiles = file;
  }
  uploadFile(){
      this.currentFileUpload = this.selectedFiles.item(0);
      //"5bd714b91c574078bf5f8e34" id todo existing used for test
      this.uploadSVC.uploadTodoFile(this.currentFileUpload, "5bd714b91c574078bf5f8e34").subscribe((event)=>{

      }, (error)=>{
          console.log(error)
      })
  }
  getFiles(){
      this.uploadSVC.getFiles().subscribe((files: any)=>{
          if(files){
              for(let i = 0; i < files.length; i++){
                  console.log(files)
                  let obj = {
                      id: files[i].id,
                      filename: files[i].filename,
                      originalname: files[i].originalname,
                      contentType: files[i].contentType,
                  }
                  this.filesList[i] = obj
              }
              console.log(this.filesList)
          }
      })
  }
  download(id, contentType, originalname) {
      console.log(id)
      console.log(contentType)
        this.uploadSVC.downloadFile(id).subscribe(
          (blob) => {
              console.log(blob)
            const file = new Blob([blob], { type: contentType });
            saveData(file, originalname);
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
