import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrlProject = environment.apiUrl + 'project/';

  constructor(private http: HttpClient,
              private authService: AuthService
                                        ) { }

   getAllProjectByUser(staffId: number): Observable<Project[]>  {
      return this.http.get<Project[]>(this.baseUrlProject + staffId);
   }
   
   createProject(project: Project) {
    return this.http.post(this.baseUrlProject + 'saveProject/' + this.authService.getStaffId(), project);
   }
}
