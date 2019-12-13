import {ActionReducerMap} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {routerReducer} from '@ngrx/router-store';
import {projectReducers} from './project.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  projects: projectReducers
};
