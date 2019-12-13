import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {of, pipe} from 'rxjs';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import _ from 'lodash';
import moment from 'moment';

import {IAppState} from '../state/app.state';
import {
  EProjectActions,
  GetProject,
  GetProjectsSuccess,
  GetProjects,
  GetProjectSuccess,
  UpdateProjectSuccess, UpdateProject, FilterProjects, FilterProjectsSuccess, DeleteProject
} from '../actions/project.actions';
import {ProjectService} from '../../shared/services/project.service';
import {IProjectHttp} from '../../shared/models/http-models/project-http.interface';
import {selectProjectState} from '../selectors/project.selectors';

@Injectable()
export class ProjectEffects {
  @Effect()
  getProject = this.action.pipe(
    ofType<GetProject>(EProjectActions.GetProject),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectProjectState))),
    switchMap(([index, store]) => {
      const { projects } = store;
      const selectedProject = projects.filter(project => project.index === index)[0];
      return of(new GetProjectSuccess(selectedProject));
    })
  );

  @Effect()
  getProjects = this.action.pipe(
    ofType<GetProjects>(EProjectActions.GetProjects),
    switchMap(() => this.projectService.getProjects()),
    switchMap((projectHttp: IProjectHttp) => {
      const { projects } = projectHttp;
      const indexedProjects = projects.map((project, index) => ({...project, index }));
      return of(new GetProjectsSuccess(indexedProjects));
    })
  );

  @Effect()
  updateProject = this.action.pipe(
    ofType<UpdateProject>(EProjectActions.UpdateProject),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectProjectState))),
    switchMap(([ project, store]) => {
      const { projects, filtered, filterObject } = store;
      const index = _.findIndex(projects, { index: project.index });
      projects[index] = project;
      if (filtered) {
        return [
          new UpdateProjectSuccess(projects),
          new FilterProjects(filterObject)
        ];
      } else {
        return of(new UpdateProjectSuccess(projects));
      }
    })
  );

  @Effect()
  deleteProject = this.action.pipe(
    ofType<DeleteProject>(EProjectActions.DeleteProject),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectProjectState))),
    switchMap(([ project, store]) => {
      const { projects, filtered, filterObject } = store;
      _.remove(projects, { index: project.index });
      if (filtered) {
        return [
          new UpdateProjectSuccess(projects),
          new FilterProjects(filterObject)
        ];
      } else {
        return of(new UpdateProjectSuccess(projects));
      }
    })
  );

  @Effect()
  filterProjects = this.action.pipe(
    ofType<FilterProjects>(EProjectActions.FilterProjects),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectProjectState))),
    switchMap(([payload, store]) => {
      const { projects } = store;
      const { searchKey, status, budget, date } = payload;
      let filteredProjects = projects;
      if (searchKey) {
        filteredProjects = _.filter(filteredProjects, (project) => {
          return _.includes(project.title.toLowerCase(), searchKey);
        });
      }
      if (status !== 'all' && status) {
        filteredProjects = _.filter(filteredProjects, (project) => {
          return _.includes(project.status.toLowerCase(), status);
        });
      }
      if (budget !== 'any' && budget) {
        filteredProjects = _.filter(filteredProjects, (project) => {
          return project.budget >= budget;
        });
      }
      if (date) {
        filteredProjects = _.filter(filteredProjects, (project) => {
          return moment(project.created).isAfter(moment(date));
        });
      }
      return of(new FilterProjectsSuccess({ projects: filteredProjects, filterObject: payload }));
    })
  );
  constructor(
    private projectService: ProjectService,
    private action: Actions,
    private store: Store<IAppState>
  ) { }
}
