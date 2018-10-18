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
                    console.log(modA)
                    modA = modA.getFullYear()+zeroDebut(modA.getMonth()+1,2)+zeroDebut(modA.getDate(),2);
                    modB = modB.getFullYear()+zeroDebut(modB.getMonth()+1,2)+zeroDebut(modB.getDate(),2);
                    console.log(modA)
                    console.log(modB)
                    return  modA < modB;
                });
                this.lists = l;
            }
        });
  }
}

function zeroDebut (val, taille) {
    let r = val + "";
    while (r.length < taille) r = "0" + r;
    return r;
};
