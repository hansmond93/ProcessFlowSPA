import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DashboardService } from '../_services/dashboard.service';
import { DashboardInfo } from '../_models/dashboardInfo';


@Injectable()
export class DashboardResolver implements Resolve<DashboardInfo> {

    constructor(private router: Router, private dashboardService: DashboardService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<DashboardInfo> {
            return this.dashboardService.getDashboardInfo().pipe(
                catchError(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ooops....',
                        text: 'Error retrieving data',
                        footer: 'Please try again later'
                    });
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
        }
}