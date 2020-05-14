import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

import { NavTopbarComponent } from './nav/nav-topbar/nav-topbar.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth.service';
import { NavSidemenuComponent } from './nav/nav-sidemenu/nav-sidemenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './_services/project.service';
import { DashboardService } from './_services/dashboard.service';
import { DashboardResolver } from './_resolvers/dashboard.resolver';

export function tokenGetter() {
  //console.log(localStorage.getItem('token'));
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavTopbarComponent,
    HomeComponent,
    NavSidemenuComponent,
    DashboardComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    BsDropdownModule.forRoot(),
    SweetAlert2Module.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ProjectService,
    DashboardService,
    DashboardResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
