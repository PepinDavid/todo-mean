//angular core
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ListcourseService } from './services/listcourse.service';
import { CourseService } from './services/course.service'
import { FilesService } from './services/files.service';
import { UserService } from './services/user.service';
//components created
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListtodoComponent } from './components/listtodo/listtodo.component';
import { MessagesComponent } from './messages/messages.component';
import { ListdetailComponent } from './components/listdetail/listdetail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { ListcourseComponent } from './components/listcourse/listcourse.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TododetailComponent } from './components/tododetail/tododetail.component';
import { CoursedetailComponent } from './components/coursedetail/coursedetail.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    ListtodoComponent,
    ListdetailComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    ListcourseComponent,
    CoursesComponent,
    TododetailComponent,
    CoursedetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ListtodoService,
    TodoService,
    ListcourseService,
    CourseService,
    FilesService,
    MessagesService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
