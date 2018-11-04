import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import  ListCourse from '../../models/listcourse.model';
import Courses from '../../models/courses.model';
import { ListcourseService } from '../../services/listcourse.service';
import { CourseService } from '../../services/course.service';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.scss']
})
export class CoursedetailComponent implements OnInit {
  @Input() courseInp: Courses;
  listCourses: ListCourse;
  selectedFiles: FileList;
  currentFileUpload: File;
  constructor(
      private route: ActivatedRoute,
      private listCourseSVC: ListcourseService,
      private courseSVC: CourseService,
      private FilesSVC: FilesService
  ) { }

  ngOnInit() {
      this.courseInp = new Courses();
      this.listCourses = new ListCourse();
      this.getList();
      this.getCourse();
  }
  getList(): void{
      const id = this.route.snapshot.paramMap.get("listCourseId");
      this.listCourseSVC.getListCourse(id).subscribe((list: any)=>{
          if(list.hasOwnProperty('obj'))
            this.listCourses = list.obj.docs[0];
      });
  }
  getCourse(): void{
      const idList = this.route.snapshot.paramMap.get("listCourseId");
      const id = this.route.snapshot.paramMap.get("courseId");
      this.courseSVC.getCourse(idList, id).subscribe((course: any)=>{
          if(course.hasOwnProperty('obj')){
              this.courseInp = course.obj.docs[0];
              this.courseInp.filesOriginal = [];
              this.getFiles();
          }
      })
  }
  updateCourse(): void{
      if(this.courseInp.title.trim() == "") return;
      if(this.courseInp.desc.trim() == "") return;
      this.courseInp.title = this.courseInp.title.trim();
      this.courseInp.desc = this.courseInp.desc.trim();
      delete this.courseInp.filesOriginal;
      console.log(this.courseInp)
      this.courseSVC.editCourse(this.listCourses._id, this.courseInp).subscribe((c)=>{
          console.log(c);
          c.obj.filesOriginal = [];
          this.courseInp = c.obj;
          this.getFiles();
      });
  }
  onFileChange(file: FileList){
        this.selectedFiles = file;
  }
  uploadFile(): void{
        this.currentFileUpload = this.selectedFiles.item(0);
        this.FilesSVC.uploadAttachmentFile(this.currentFileUpload, this.courseInp._id)
          .subscribe((res: any)=>{
              let id = res.obj._id;
              if(this.courseInp.files.length > 0)
                  this.courseInp.files.push(id);
              else
                  this.courseInp.files = [id];
console.log(this.courseInp.files);
              this.updateCourse();
            }, (error)=>{
                console.log(error)
            });
  }
  getFiles(): void{
        if(this.courseInp.files.length > 0 ){
            this.FilesSVC.getFilesByAttachment(this.courseInp._id).subscribe((files: any)=>{
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
                    this.courseInp.filesOriginal = filesList;
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
    if(this.courseInp.files.indexOf(id) > -1){
        this.FilesSVC.removeFile(id).subscribe(
            (res)=>{
                console.log(res)
                self.courseInp.files = self.courseInp.files.filter(f => f !== id);
                self.updateCourse();
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
