import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public login: string;
  public isAuthenticated = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe((res: boolean) => {
        this.isAuthenticated = res;
        this.login = this.authService.getUserInfoFromStorage().login;
      });
  }

  public logoff(): void {
    // log out - clear store, crear auth data
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
