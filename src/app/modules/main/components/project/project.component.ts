import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import _ from 'lodash';
import {Router} from '@angular/router';

import {IProject} from '../../../../shared/models/project.interface';
import {IAppState} from '../../../../store/state/app.state';
import {DeleteProject, UpdateProject} from '../../../../store/actions/project.actions';
import moment from 'moment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input()
  project: IProject;

  editable = false;

  projectForm: FormGroup;
  constructor(
    private store: Store<IAppState>,
    private  router: Router,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      index: new FormControl({value: this.project.index, disabled: true}),
      title: new FormControl({value: this.project.title, disabled: true}),
      division: new FormControl({value: this.project.division, disabled: true}),
      project_owner: new FormControl({value: this.project.project_owner, disabled: true}),
      budget: new FormControl({value: this.project.budget, disabled: true}, [Validators.min(0)]),
      status: new FormControl({value: this.project.status, disabled: true}),
      created: new FormControl({value: this.project.created, disabled: true}),
      modified: new FormControl({value: this.project.modified, disabled: true})
    });
  }

  onClickModify() {
    const ctrlProjectOwner = this.projectForm.get('project_owner');
    const ctrlBudget = this.projectForm.get('budget');
    const ctrlStatus = this.projectForm.get('status');
    if (this.editable) {
      if (!this.projectForm.valid) { return; }
      ctrlProjectOwner.enabled ? ctrlProjectOwner.disable() : ctrlProjectOwner.enable();
      ctrlBudget.enabled ? ctrlBudget.disable() : ctrlBudget.enable();
      ctrlStatus.enabled ? ctrlStatus.disable() : ctrlStatus.enable();
      this.editable = false;
      if (!_.isEqual(this.projectForm.value, this.project)) {
        this.store.dispatch(new UpdateProject({...this.projectForm.value, modified: moment().format('MM/DD/YYYY')}));
      }
    } else {
      ctrlProjectOwner.enabled ? ctrlProjectOwner.disable() : ctrlProjectOwner.enable();
      ctrlBudget.enabled ? ctrlBudget.disable() : ctrlBudget.enable();
      ctrlStatus.enabled ? ctrlStatus.disable() : ctrlStatus.enable();
      this.editable = true;
    }
  }

  onClickDelete() {
    this.store.dispatch(new DeleteProject(this.project));
  }
}
