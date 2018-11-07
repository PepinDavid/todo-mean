import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = [];
  constructor() {
      
   }
  sendMessage(mess: string){
      this.messages.push(mess);
  }
  clearMessage(){
      this.messages = [];
  }
}
