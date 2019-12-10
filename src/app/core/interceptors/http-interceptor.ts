import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '@core/services/auth.service';

export const BASE_URL = 'http://localhost:3004/'

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = req.params;
    if (!req.url.includes('login')) {
      params = params.append('token=', this.authService.getUserInfoFromStorage().token);
    }
    const dupReq = req.clone({url: BASE_URL + req.url, params});

    return next.handle(dupReq);
  }
}
