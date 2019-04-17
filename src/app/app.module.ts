import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpService } from './http.service';
import { ClassComponent } from './class/class.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { TrainerComponent } from './trainer/trainer.component';
import { AddEditComponent } from './add-edit/add-edit.component'

const route: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'class', component: ClassComponent},
  {path: 'student', component: StudentComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'trainer', component:TrainerComponent},
  {path: 'add-edit', component:AddEditComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ClassComponent,
    DashboardComponent,
    StudentComponent,
    TrainerComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(route),
    HttpClientModule,
    NgbModule.forRoot(),

  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
