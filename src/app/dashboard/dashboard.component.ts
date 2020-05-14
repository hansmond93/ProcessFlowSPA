import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardInfo } from '../_models/dashboardInfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardInfo: DashboardInfo;

  constructor(private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log('data', data);
      this.dashboardInfo = data['DashboardInfo'];
      console.log(this.dashboardInfo);
    });
  }

}
