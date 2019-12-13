import {Component, Input, OnInit, Output, EventEmitter, IterableDiffers, IterableDiffer, DoCheck} from '@angular/core';
import {faFilter, faSearch, faSort} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {IProject} from '../../../../shared/models/project.interface';
import {IAppState} from '../../../../store/state/app.state';
import {ClearFilter, FilterProjects} from '../../../../store/actions/project.actions';
import moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, DoCheck {
  @Input()
  projects: IProject[];
  @Output()
  projectSelected: EventEmitter<string> = new EventEmitter();

  private iterableDiffer: IterableDiffer<any>;

  faSearch = faSearch;
  faFilter = faFilter;
  faSort = faSort;

  filterForm: FormGroup;
  constructor(
    private store: Store<IAppState>,
    public formBuilder: FormBuilder,
    iterableDiffers: IterableDiffers
  ) {
    this.initForm();
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  newCount = 0;
  workingCount = 0;
  deliveredCount = 0;
  archivedCount = 0;
  totalBudget = 0;
  totalDivision = 0;

  sortByTitle;
  sortByDivision;
  sortByProjectOwner;
  sortByBudget;
  sortByStatus;
  sortByCreated;
  sortByModified;

  sortBy = {
    title: null,
    division: null,
    project_owner: null,
    budget: null,
    status: null,
    created: null,
    modified: null,
  };

  ngOnInit() {
    this.initForm();
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.projects);
    if (changes) {
      this.newCount = this.projects.filter(p => p.status === 'new').length;
      this.workingCount = this.projects.filter(p => p.status === 'working').length;
      this.deliveredCount = this.projects.filter(p => p.status === 'delivered').length;
      this.archivedCount = this.projects.filter(p => p.status === 'archived').length;
      this.totalBudget = this.projects.reduce((a, b) => a + b.budget, 0);
      this.totalDivision = _.uniqBy(this.projects, 'division').length;
    }
  }

  initForm() {
    this.filterForm = this.formBuilder.group({
      searchKey: new FormControl(''),
      status: new FormControl('all'),
      budget: new FormControl('any'),
      date: new FormControl('')
    });
  }

  onFilterApply() {
    this.store.dispatch( new FilterProjects(this.filterForm.value));
  }

  onFilterClear() {
    this.initForm();
    this.store.dispatch( new ClearFilter());
  }

  navigateToProject(title: string) {
    this.projectSelected.emit(title);
  }

  onSortBy(key) {
    this.sortBy[key] = !this.sortBy[key];
    switch (key) {
      case 'title':
      case 'division':
      case 'project_owner':
      case 'status':
        this.projects.sort( (a, b) => {
          return this.sortBy[key] ? ('' + a[key]).localeCompare(b[key]) : ('' + b[key]).localeCompare(a[key]);
        });
        return this.projects;
      case 'budget':
        this.projects.sort( (a, b) => {
          return this.sortBy.budget ? a.budget - b.budget : b.budget - a.budget;
        });
        return this.projects;
      case 'created':
      case 'modified':
        this.projects = _.sortBy(this.projects, (project) => {
          if (project[key]) {
            return moment(project[key]);
          } else {
            return -1;
          }
        });
        return this.sortBy[key] ? this.projects : this.projects.reverse();
      default:
        return this.projects;
    }
  }

  onClickNewProject() { alert('New Project'); }

  onClickExport() { alert('Export'); }
}
