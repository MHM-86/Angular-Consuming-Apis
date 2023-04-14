import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class interceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token') || "";
    return next.handle(httpRequest.clone({
      setHeaders: {
        Authorization: token,
        ContentType: 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }));
  }
}