import {IProject} from '../../shared/models/project.interface';

export interface FilterObject {
  projectOwner: string;
  status: string;
  date: string;
  budget: number;
}

export interface IProjectState {
  projects: IProject[];
  selectedProject: IProject;
  filteredProjects: IProject[];
  filterObject: FilterObject;
  filtered: boolean;
}

export const initialProjectState: IProjectState = {
  projects: null,
  filteredProjects: null,
  selectedProject: null,
  filtered: false,
  filterObject: null
};
