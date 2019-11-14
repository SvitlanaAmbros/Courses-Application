import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginUser } from '@shared/models/user.model';
import { AuthService } from '@login/services/auth.service';

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
    this.authService.login(this.user);
    this.router.navigateByUrl('/courses');
  }
}
