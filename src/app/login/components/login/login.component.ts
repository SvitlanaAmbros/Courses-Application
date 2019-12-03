import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { LoginUser } from '@shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: LoginUser = {
    login: 'user',
    password: '1234'
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public logIn(): void {
    // set user data to local storage and navigate to courses page
    this.authService.login(this.user);
    this.router.navigateByUrl('/courses');
  }
}
