import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { LoginUser } from '@shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$: Observable<LoginUser>;
  public isAuthenticated = false;
  constructor(private router: Router, private authService: AuthService, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe((res: boolean) => {
        this.isAuthenticated = res;
        this.cdref.detectChanges();
        this.user$ = this.authService.getFullUserInfo(this.authService.getUserInfoFromStorage().token);
      });
  }

  public logoff(): void {
    // log out - clear store, clear auth data
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
