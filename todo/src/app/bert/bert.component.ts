import { Component, OnInit } from '@angular/core';
import { BertService } from '../services/bert.service';

@Component({
  selector: 'app-bert',
  templateUrl: './bert.component.html',
  styleUrls: ['./bert.component.scss']
})
export class BertComponent implements OnInit {
  constructor(
    private bertSVC: BertService
  ) { }

  ngOnInit() {
      this.clearMessage();
  }
  clearMessage(){
      setInterval(()=>{
          this.bertSVC.clearMessage();
      },5000)
  }
}
