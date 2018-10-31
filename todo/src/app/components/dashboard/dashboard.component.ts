import { Component, OnInit } from '@angular/core';
import { ListtodoService } from '../../services/listtodo.service';
import { ListcourseService } from '../../services/listcourse.service';
import  ListTodo from '../../models/listtodo.model';
import  ListCourse from '../../models/listcourse.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lists: ListTodo[] = [];
  listCourse: ListCourse[] = [];

  constructor(
      private listSVC: ListtodoService,
      private listCourseSVC: ListcourseService
  ) { }

  ngOnInit() {
      this.getAllLists();
      this.getListCourse();
  }
  getAllLists(): void{
      this.listSVC.getAllLists("from dashboard")
        .subscribe((list: any)=>{
            if(list.hasOwnProperty("obj")){
                let l = list.obj;
                l.sort((a,b)=>{
                    let modA: any = new Date(a.modifiedAt);
                    let modB: any = new Date(b.modifiedAt);
                    modA = dateToString(modA);
                    modB = dateToString(modB);
                    return  modA < modB;
                });
                this.lists = l;
            }
        });
  }
  getListCourse(): void{
      this.listCourseSVC.getAllListsCourse("from dashboard")
        .subscribe((listCourse: any)=>{
            if(listCourse.hasOwnProperty("obj"))
            listCourse.obj.forEach((obj)=>{
                if(this.listCourse.length < 5)
                    this.listCourse.push(obj);
            });
        });
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
