import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { ListcourseService } from '../../services/listcourse.service';
import  ListCourse from '../../models/listcourse.model';

@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourse.component.html',
  styleUrls: ['./listcourse.component.scss']
})
export class ListcourseComponent implements OnInit {
  @Input() listInp: ListCourse;
  listsCourse: ListCourse[] = [];
  isVisible: boolean = false;
  constructor(
      private listCourseSVC: ListcourseService
  ) { }

  ngOnInit() {
      this.listInp = new ListCourse();
      this.getListCourse();
  }
  formVisible(){
      if(this.isVisible)
        this.isVisible = false;
      else
        this.isVisible = true;
  }
  getListCourse(): void{
      this.listCourseSVC.getAllListsCourse("from listcourse component").subscribe((listCourse: any)=>{
            if(listCourse.hasOwnProperty("obj"))
                this.listsCourse = listCourse.obj;
        })
  }
  delete(list: ListCourse){
      this.listsCourse = this.listsCourse.filter(l=> l !== list);
      this.listCourseSVC.deleteListCourse(list).subscribe();
  }
  clearList(){
      this.listInp = new ListCourse();
  }
  add(l: ListCourse): void{
      let titre = l.title.trim();
      let descr = l.desc.trim();
      if(!titre){return;}
      if(!descr){return;}
      let list = new ListCourse();
      this.listInp.title = titre;
      this.listInp.desc = descr;
      this.listCourseSVC.addListCourse(this.listInp)
        .subscribe( (list: any) => {
            this.listsCourse.push(list);
            this.clearList();
      });
  }
  listsCourseLength(){
      return this.listsCourse.length > 0
  }
}

function dateToString(date: any){
    return date.getFullYear()+zeroDebut(date.getMonth()+1,2)+zeroDebut(date.getDate(),2);
}

function zeroDebut (val, taille) {
    let r = val + "";
    while (r.length < taille) r = "0" + r;
    return r;
};
