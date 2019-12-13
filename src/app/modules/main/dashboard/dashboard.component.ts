import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../store/state/app.state';
import {Router} from '@angular/router';
import {GetProjects} from '../../../store/actions/project.actions';
import {selectFilteredProjectList} from '../../../store/selectors/project.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects = this.store.pipe(select(selectFilteredProjectList));

  constructor(
    private store: Store<IAppState>,
    private  router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetProjects());
  }

  navigateToProject(title: string) {
    // this.router.navigate(['project', title]);
  }
}
