import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BertService {
  color: string = "white";
  messages: string[] = [];
  constructor() { }
  sendMessage(mess: string, color: string){
      if(this.color != color)
            this.clearMessage();
      this.color = color;
      this.messages.push(mess);
  }
  clearMessage(){
      this.messages = [];
  }
}
