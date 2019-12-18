import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from '@core/services/auth.service';
import {LoginUser} from '@app/models/user.model';
import {AppState} from '@app/store/reducers/app.reducers';
import {Store, select} from '@ngrx/store';
import {selectUser} from '@app/store/selectors/user.selector';
import * as userActions from '@store/actions/user.actions';
import {LocalStorageService} from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$: Observable<LoginUser>;
  public isAuthenticated = false;

  constructor(private router: Router,
              private authService: AuthService,
              private cdref: ChangeDetectorRef,
              private localStorage: LocalStorageService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe((res: boolean) => {
        this.isAuthenticated = res;
        this.cdref.detectChanges();
        if (res) {
          console.log('is authenticated ', res);
          this.store.dispatch(new userActions.GetUserInfo());
          // this.store.pipe(select(selectUser)).subscribe(res => console.log('pipe subscribe', res)
          // )
          this.user$ = this.store.pipe(select(selectUser));
          // this.user$ = this.authService.getFullUserInfo(this.localStorage.getUserFromStorage().token);
        }

      });

  }

  public logoff(): void {
    // log out - clear store, clear auth data
    this.store.dispatch(new userActions.Logoff());
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
