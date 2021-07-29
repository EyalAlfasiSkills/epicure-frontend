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
    if (this.auth.isLoggedIn) {
      this.router.navigate(['admin'])
    }
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.auth.login({ password: this.password, email: this.email }).subscribe((userData) => {
        console.log(userData);
        const { accessToken, refreshToken, idToken } = userData.response.token
        if (accessToken && refreshToken) {
          console.log('Logged in successfully');
          this.router.navigate(['admin'])
        }
      }, (err) => {
        console.log(err);
      })
    }
  }

}
