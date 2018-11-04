import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import  ListCourse from '../../models/listcourse.model';
import Courses from '../../models/courses.model';
import { ListcourseService } from '../../services/listcourse.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  @Input() courseInp: Courses;
  listCourses: ListCourse;
  courses: Courses[] = [];
  elementClicked = "";
  nbPage: number = 1;
  nbTotal: number = 100;
  constructor(
      private route: ActivatedRoute,
      private location: Location,
      private listCourseSVC: ListcourseService,
      private courseSVC: CourseService
  ) { }

  ngOnInit() {
      this.listCourses = new ListCourse();
      this.courseInp = new Courses();
      this.getListCourse();
      this.getCourses();
  }
  getListCourse(): void{
      const id = this.route.snapshot.paramMap.get("listCourseId");
      this.listCourseSVC.getListCourse(id).subscribe((list: any)=>{
          if(list.hasOwnProperty('obj'))
            this.listCourses = list.obj.docs[0];
      });
  }
  getCourses(): void{
      const id = this.route.snapshot.paramMap.get("listCourseId");
      this.courseSVC.setnbPage(this.nbPage);
      this.courseSVC.getCoursesListId(id, "from courses").subscribe((courses: any)=>{
         if(courses.hasOwnProperty('obj')){
             this.courses = courses.obj.docs;
             this.nbTotal = courses.obj.pages;
         }
      });
  }
  add(course: Courses): void {
      if(!course.title.trim()){return;}
      if(!course.desc.trim()){return;}
      this.courseInp = course;
      let id = this.listCourses._id;
      this.courseInp.idListCourse = id;
      this.courseSVC.createCourse(id, this.courseInp)
        .subscribe((t: any)=>{
          this.courses.push(t.obj);
          course.title = "";
          course.desc = "";
        });
  }
  updateCell(e, course: Courses): void{
      let el = e.path[0];
      if(el.innerText.trim() == "") return;
      if(el.keyCode == 13){
          if($(el).attr("class").indexOf("courseTitle") > -1)
              course.title = el.innerText
          else
              course.desc = el.innerText;

         this.courseSVC.editCourse(this.listCourses._id, course).subscribe((c)=>{
             console.log(c);
         });
      }
  }
  deleteCourse(course: Courses): void{
      let id = this.listCourses._id;
      this.courses = this.courses.filter(c => c !== course);
      this.courseSVC.deleteCourse(id, course).subscribe();
  }
  prevPage(){
      if(this.nbPage > 1){
          this.nbPage--;
          this.courseSVC.setnbPage(this.nbPage);
          this.getCourses();
      }
  }
  nextPage(){
      if(this.nbPage < this.nbTotal){
          this.nbPage++;
          this.courseSVC.setnbPage(this.nbPage);
          this.getCourses();
      }
  }
}
