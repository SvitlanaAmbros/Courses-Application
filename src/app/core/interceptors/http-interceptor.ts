import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
  } from '@angular/common/http';
import { Observable } from 'rxjs';

export const BASE_URL = 'http://localhost:3004/'

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor  {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const dupReq = req.clone({ url: BASE_URL + req.urlWithParams});
        console.log(req);
        return next.handle(dupReq)
    }
}
