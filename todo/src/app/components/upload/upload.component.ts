import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
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
  onFileChange(file: FileList) {
    this.selectedFiles = file;
  }
  uploadFile() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadSVC.uploadFile(this.currentFileUpload).subscribe((event) => {

    }, (error) => {
      console.log(error)
    })
  }
  getFiles() {
    this.uploadSVC.getFiles().subscribe((files: any) => {
      if (files) {
        for (let i = 0; i < files.length; i++) {
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
    this.uploadSVC.downloadFile(id).subscribe(
      (blob) => {
        console.log(blob)
        const file = new Blob([blob], { type: contentType });
        saveData(file, originalname);
      }
    );
  }
  removeFile(id) {
    let self = this
    this.uploadSVC.removeFile(id).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }
}
var saveData = (function() {
  var a = document.createElement("a");
  document.body.appendChild(a);
  return function(data, fileName) {
    var url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());
