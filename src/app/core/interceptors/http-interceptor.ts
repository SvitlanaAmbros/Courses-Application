import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { finalize } from 'rxjs/operators';

import {AuthService} from '@core/services/auth.service';
import { LoadingService } from '@shared/services/loading.service';
import { LocalStorageService } from '@app/shared/services/local-storage.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/store/reducers/app.reducers';
import { selectUser, selectUserToken } from '@app/store/selectors/user.selector';

export const BASE_URL = 'http://localhost:3004/'

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService, 
      private loadingService: LoadingService, 
      private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = req.params;
    let userToken = '';

    this.store.pipe(select(selectUserToken)).subscribe(token => {
      userToken = token;
    });

    if (!req.url.includes('login')) {
      params = params.append('token', userToken);
    }
    const dupReq = req.clone({url: BASE_URL + req.url, params});

    this.loadingService.showLoadingWindow();
    return next.handle(dupReq)
      .pipe(
        finalize(() => this.loadingService.hideLoadingWindow()
      )
    );
  }
}
