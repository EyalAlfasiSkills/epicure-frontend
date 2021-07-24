import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  email = ''
  password = ''

  errorStr = ''

  ngOnInit(): void {
    this.loggedInUserListener()
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.auth.login({ password: this.password, email: this.email }).subscribe(({ user, accessToken }) => {
        if (user && accessToken) {
          console.log('Logged in successfully');
        }
      }, (err) => {
        console.log(err);
      })
    }
  }

  loggedInUserListener() {
    this.auth.loggedInUser$.subscribe(user => {
      if (user) {
        this.router.navigate(['admin'])
      }
    })
  }

}
