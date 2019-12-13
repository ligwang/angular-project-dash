import {RouterReducerState} from '@ngrx/router-store';
import {IProjectState, initialProjectState} from './project.state';

export interface IAppState {
  router?: RouterReducerState;
  projects: IProjectState;
}

export const initialAppState: IAppState = {
  projects: initialProjectState
};

export function getInitialState(): IAppState {
return initialAppState;
}
