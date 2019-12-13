import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {IProjectHttp} from '../models/http-models/project-http.interface';

@Injectable()
export class ProjectService {
  projectsUrl = `${environment.apiUrl}project.json`;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProjectHttp> {
    return this.http.get<IProjectHttp>(this.projectsUrl);
  }
}
