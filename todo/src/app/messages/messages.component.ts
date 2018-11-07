import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private messageSVC: MessagesService) { }

  ngOnInit() {
      this.clearMessage();
  }
  clearMessage(){
      setInterval(()=>{
          this.messageSVC.clearMessage();
      },10000)
  }
}
