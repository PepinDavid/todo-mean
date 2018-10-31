import { Component, OnInit, Input } from '@angular/core';

import User from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() user: User;

  constructor(
      private UserSVC: UserService
  ) { }

  ngOnInit() {
      this.user = new User();
  }
  register(user: User): void{
      console.log(user)
      this.UserSVC.createUser(user).subscribe((u)=>{
          console.log(u);
      })
  }
}
