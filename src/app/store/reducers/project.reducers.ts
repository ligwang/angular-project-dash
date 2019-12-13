import _ from 'lodash';
import {EProjectActions, ProjectActions} from '../actions/project.actions';
import {initialProjectState, IProjectState} from '../state/project.state';

export const projectReducers = (
  state = initialProjectState,
  action: ProjectActions
): IProjectState => {
  switch (action.type) {
    case EProjectActions.GetProjectsSuccess: {
      return {
        ...state,
        projects: action.payload
      };
    }
    case EProjectActions.GetProjectSuccess: {
      return {
        ...state,
        selectedProject: action.payload
      };
    }
    case EProjectActions.UpdateProjectSuccess: {
      return {
        ...state,
        projects: action.payload
      };
    }
    case EProjectActions.FilterProjectsSuccess: {
      return {
        ...state,
        filtered: true,
        filteredProjects: action.payload.projects,
        filterObject: action.payload.filterObject
      };
    }
    case EProjectActions.ClearFilter: {
      return {
        ...state,
        filtered: false,
        filterObject: null
      };
    }
    default:
      return state;
  }
};
