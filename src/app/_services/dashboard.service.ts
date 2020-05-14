import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { DashboardInfo } from '../_models/dashboardInfo';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getDashboardInfo() :Observable<DashboardInfo> {
    return this.http.get<DashboardInfo>(this.baseUrl + 'project/dashboard/information/' + this.authService.getStaffId());
  }

}
