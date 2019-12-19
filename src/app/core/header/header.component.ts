import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';

import {AuthService} from '@core/services/auth.service';
import {AppState} from '@store/reducers/app.reducers';
import {selectUser} from '@store/selectors/user.selector';
import * as userActions from '@store/actions/user.actions';
import {LoginUser} from '@app/models/user.model';

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
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe((res: boolean) => {
        this.isAuthenticated = res;
        this.cdref.detectChanges();
        if (res) {
          this.store.dispatch(new userActions.GetUserInfo());
          this.user$ = this.store.pipe(select(selectUser));
        }
      });

  }

  public logoff(): void {
    this.store.dispatch(new userActions.Logoff());
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
