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
      private filesSVC: FilesService
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
            this.listCourses = list.obj[0];
      });
  }
  getCourse(): void{
      const idList = this.route.snapshot.paramMap.get("listCourseId");
      const id = this.route.snapshot.paramMap.get("courseId");
      this.courseSVC.getCourse(idList, id).subscribe((course: any)=>{
          if(course.hasOwnProperty('obj'))
            this.courseInp = course.obj[0];
      })
  }
}
