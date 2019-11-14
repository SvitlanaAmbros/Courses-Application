import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@login/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated = true;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public logoff(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
