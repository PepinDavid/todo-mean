import { Component, OnInit } from '@angular/core';
import { ListtodoService } from '../../services/listtodo.service';
import  ListTodo from '../../models/listtodo.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lists: ListTodo[] = [];
  constructor(
      private listSVC: ListtodoService
  ) { }

  ngOnInit() {
      this.getAllLists();
  }
  getAllLists(): void{
      console.log(this.lists)
      this.listSVC.getAllLists("from dashboard")
        .subscribe((list)=>{
            if(list.hasOwnProperty("obj")){
                let l = list.obj;
                l.sort((a,b)=>{
                    let modA = new Date(a.modifiedAt);
                    let modB = new Date(b.modifiedAt);
                    modA = dateToString(modA);
                    modB = dateToString(modB);
                    return  modA < modB;
                });
                this.lists = l;
            }
        });
  }
}

function dateToString(date){
    return date.getFullYear()+zeroDebut(date.getMonth()+1,2)+zeroDebut(date.getDate(),2);
}

function zeroDebut (val, taille) {
    let r = val + "";
    while (r.length < taille) r = "0" + r;
    return r;
};
