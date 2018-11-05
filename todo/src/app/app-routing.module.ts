import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListtodoComponent } from './components/listtodo/listtodo.component';
import { ListdetailComponent } from './components/listdetail/listdetail.component';
import { TododetailComponent } from './components/tododetail/tododetail.component';
import { ListcourseComponent } from './components/listcourse/listcourse.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursedetailComponent } from './components/coursedetail/coursedetail.component';
import { ProfilComponent } from './components/profil/profil.component';

//users
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//for test
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },
    {path: 'upload', component: UploadComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'lists', component: ListtodoComponent},
    {path: 'lists/:listId', component: ListdetailComponent},
    {path: 'lists/:listId/todo/:todoId', component: TododetailComponent},
    {path: 'listscourses', component: ListcourseComponent},
    {path: 'listscourses/:listCourseId', component: CoursesComponent},
    {path: 'listscourses/:listCourseId/course/:courseId', component: CoursedetailComponent},
    {path: 'profil', component: ProfilComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
