import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
                                                ) { }

  ngOnInit(): void {
    if(this.authService.loggedIn() === true) {
      this.router.navigate(['/dashboard']);
    }
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: [this.confirmUsernameHasValue, this.confirmPasswordHasValue ]});
  }

  logIn() {
    if(this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value).subscribe(()=> {
        // console.log('Logged In Successfully', this.authService.decodedToken);
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Logged in Successfully',
        });
      }, error => {
        //console.log(error);
        const err = error;
        Swal.fire({
          icon: 'error',
          title: 'Ooops....',
          text: err,
          // footer: 'Please try again later'
      });
      if(this.authService.loggedIn() === true)
      {
        this.router.navigate(['/dashboard']);
      }
      }, () => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  confirmPasswordHasValue(g: FormGroup) {
    return g.get('password').value === (null || '') ? {'noValuePass': true} : null;
  }

  confirmUsernameHasValue(g: FormGroup) {
    return g.get('username').value === (null || '') ? {'noValueUser': true} : null;
  }

}
