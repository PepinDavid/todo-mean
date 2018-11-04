import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { FilesService } from '../../services/files.service';

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
    public filesSVC: FilesService
  ) { }
  ngOnInit() {
    this.getFiles();
  }
  onFileChange(file: FileList) {
    this.selectedFiles = file;
  }
  uploadFile() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.filesSVC.uploadFile(this.currentFileUpload).subscribe((event) => {
      this.getFiles();
    }, (error) => {
      console.log(error)
    })
  }
  getFiles() {
    this.filesSVC.getFiles().subscribe((files: any) => {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          let obj = {
            id: files[i].id,
            filename: files[i].filename,
            originalname: files[i].originalname,
            contentType: files[i].contentType,
            attachmentId: files[i].attachmentId
          }
          this.filesList[i] = obj
        }
      } else {
          this.filesList = [];
      }
    })
  }
  download(id, contentType, originalname) {
    this.filesSVC.downloadFile(id).subscribe(
      (blob) => {
        const file = new Blob([blob], { type: contentType });
        saveData(file, originalname);
      }
    );
  }
  removeFile(id) {
    let self = this
    this.filesSVC.removeFile(id).subscribe(
      (res) => {
        self.filesList = self.filesList.filter((f: any) => { f.id !== id })
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
