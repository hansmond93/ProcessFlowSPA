import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-topbar',
  templateUrl: './nav-topbar.component.html',
  styleUrls: ['./nav-topbar.component.css']
})
export class NavTopbarComponent implements OnInit {
  username: string;

  constructor(public authService: AuthService,
              private router: Router
                                              ) { }

  ngOnInit(): void {
    this.username = this.authService.decodedToken?.Username;
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.decodedToken = null;
    this.router.navigate(['/home']);
  }

  

}
