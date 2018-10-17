//angular core
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//components angular
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//services created
import { TodoService } from './services/todo.service';
import { ListtodoService } from './services/listtodo.service';
import { MessagesService } from './services/messages.service';
//components created
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListtodoComponent } from './components/listtodo/listtodo.component';
import { MessagesComponent } from './messages/messages.component';
import { ListdetailComponent } from './components/listdetail/listdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    ListtodoComponent,
    ListdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ListtodoService,
    TodoService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
