import { Component, OnInit, Input } from '@angular/core';

import User from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() user: User;
  constructor(
      private userSVC: UserService
  ) { }

  ngOnInit() {
      this.user = new User();
  }
  login(user: User):void{
      this.userSVC.login(user).subscribe((u)=>{
         console.log(u);
      });
  }
}
