import { Component, OnInit, Input } from '@angular/core';
import User from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  @Input() userInp: User;
  @Input() pwd = {password: "", confirm:""};
  constructor(
      private userSVC: UserService
  ) { }

  ngOnInit() {
      this.userInp = new User();
      this.getUser();
  }
  getUser(){
      this.userSVC.getMe().subscribe((user: any)=>{
          if(user.hasOwnProperty("obj"))
              this.userInp = user.obj;
      });
  }
  updateUser(){
      if(this.userInp.name.trim() == "") return;
      if(this.userInp.surname.trim() == "") return;
      if(this.userInp.email.trim() == "") return;
      this.userInp.name = this.userInp.name.trim();
      this.userInp.surname = this.userInp.surname.trim();
      this.userInp.email = this.userInp.email.trim();
      this.userSVC.updateUser(this.userInp).subscribe((user: any)=>{
          if(user.hasOwnProperty("obj"))
            this.userInp = user.obj;
      });
  }
  updatePwd(){
      if(this.pwd.password.trim() == "") return;
      if(this.pwd.confirm.trim() == "") return;
      this.pwd.password = this.pwd.password.trim();
      this.pwd.confirm = this.pwd.confirm.trim();
      if(this.pwd.password != this.pwd.confirm) return;
      this.userSVC.updatePwd(this.pwd.password).subscribe((user: any)=>{
          console.log(user)
          if(user.hasOwnProperty("obj"))
            this.userInp = user.obj;
      });
  }
}
