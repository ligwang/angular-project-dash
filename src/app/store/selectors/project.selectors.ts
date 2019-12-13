import {IAppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {IProjectState} from '../state/project.state';

const selectProjects = (state: IAppState) => state.projects;

export const selectProjectState = createSelector(
  selectProjects,
  (state: IProjectState) => {
    return state;
  }
);

export const selectFilteredProjectList = createSelector(
  selectProjects,
  (state: IProjectState) => {
    if (state.filtered) {
      return state.filteredProjects;
    } else {
      return  state.projects;
    }
  }
);

export const selectFilterObject = createSelector(
  selectProjects,
  (state: IProjectState) => {
    return state.filteredProjects;
  }
);

export const selectSelectedProject = createSelector(
  selectProjects,
  (state: IProjectState) => state.selectedProject
);

