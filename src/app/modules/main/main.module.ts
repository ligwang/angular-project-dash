import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectComponent } from './components/project/project.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OwlDateTimeModule} from 'ng-pick-datetime';


const routes: Routes = [
  {path: '', component: DashboardComponent}
];

@NgModule({
  declarations: [DashboardComponent, ProjectsComponent, ProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    OwlDateTimeModule,
  ]
})
export class MainModule { }
