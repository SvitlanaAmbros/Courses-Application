import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { LoginUser } from '@shared/models/user.model';
import { LoadingService } from '@shared/services/loading.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: LoginUser = {
    login: 'user',
    password: 'user'
  };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit() {
  }

  public logIn(): void {
    // set user data to local storage and navigate to courses page
    this.loadingService.showLoadingWindow();
    this.authService.login(this.user)
      .pipe(
        finalize(() => this.loadingService.hideLoadingWindow())
      )
      .subscribe(
        res => this.router.navigateByUrl('/courses'),
        err =>  alert('Not right credentials. Please, try again')
      );
  }
}
