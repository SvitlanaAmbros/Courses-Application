import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { finalize } from 'rxjs/operators';

import {AuthService} from '@core/services/auth.service';
import { LoadingService } from '@shared/services/loading.service';

export const BASE_URL = 'http://localhost:3004/'

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = req.params;
    if (!req.url.includes('login')) {
      params = params.append('token=', this.authService.getUserInfoFromStorage().token);
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
