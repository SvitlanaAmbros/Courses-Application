import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';

import {AuthService} from '@core/services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('!!!!!!!!!!!!!');
    let isAuthenticatedRes: boolean | UrlTree;
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated === true) {
        isAuthenticatedRes = isAuthenticated;
      } else {
        isAuthenticatedRes = this.router.parseUrl('/login');
      }
    });

    console.log(isAuthenticatedRes);
    return isAuthenticatedRes;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Child');
    return this.canActivate(childRoute, state);
  }
}
