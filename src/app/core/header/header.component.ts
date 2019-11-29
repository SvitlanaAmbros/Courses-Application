import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe((res: boolean) => {
        this.isAuthenticated = res;
        console.log('Changed', res);
      }
      );
  }

  public logoff(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
