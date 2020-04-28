import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ProcessFlowSPA';

  constructor(
    private authService: AuthService
                                      ) { }

  ngOnInit(): void {
    this.loggedIn();
  }


  loggedIn() : boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
