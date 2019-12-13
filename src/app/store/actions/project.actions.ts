import {Action} from '@ngrx/store';
import {IProject} from '../../shared/models/project.interface';
import {FilterObject} from '../state/project.state';

export enum EProjectActions {
  GetProjects = '[Project] Get Projects',
  GetProjectsSuccess = '[Project] Get Projects Success',
  GetProject = '[Project] Get Project',
  GetProjectSuccess = '[Project] Get Project Success',
  UpdateProject = '[Project] Update Project',
  UpdateProjectSuccess = '[Project] Update Project Success',
  DeleteProject = '[Project] Delete Project',
  FilterProjects = '[Project] Filter Projects',
  FilterProjectsSuccess = '[Project] Filter Projects Success',
  ClearFilter = '[Project] Filter Clear'
}

export class GetProjects implements Action {
  public readonly type = EProjectActions.GetProjects;
}

export class GetProjectsSuccess implements Action {
  public readonly type = EProjectActions.GetProjectsSuccess;
  constructor(public payload: IProject[]) {
  }
}

export class GetProject implements Action {
  public readonly type = EProjectActions.GetProject;
  constructor(public payload: number) { }
}

export class GetProjectSuccess implements Action {
  public readonly type = EProjectActions.GetProjectSuccess;
  constructor(public payload: IProject) {
  }
}

export class UpdateProjectSuccess implements Action {
  public readonly type = EProjectActions.UpdateProjectSuccess;
  constructor(public payload: IProject[]) {
  }
}

export class UpdateProject implements Action {
  public readonly type = EProjectActions.UpdateProject;
  constructor(public payload: IProject) {
  }
}

export class FilterProjects implements Action {
  public readonly type = EProjectActions.FilterProjects;
  constructor(public payload: any) {
  }
}

export class FilterProjectsSuccess implements Action {
  public readonly type = EProjectActions.FilterProjectsSuccess;
  constructor(public payload: { projects: IProject[], filterObject: FilterObject }) {
  }
}

export class ClearFilter implements Action {
  public readonly type = EProjectActions.ClearFilter;
}

export class DeleteProject implements Action {
  public readonly type = EProjectActions.DeleteProject;
  constructor(public payload: IProject) {
  }
}


export type ProjectActions =
  | GetProjects
  | GetProjectsSuccess
  | GetProject
  | GetProjectSuccess
  | UpdateProject
  | UpdateProjectSuccess
  | DeleteProject
  | FilterProjects
  | FilterProjectsSuccess
  | ClearFilter;
