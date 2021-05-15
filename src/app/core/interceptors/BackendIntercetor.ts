import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class BackendHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.method === 'POST' &&
      request.url === 'http://localhost:4200/users/authenticate'
    ) {
      if (
        request.body.username == 'bcube___' &&
        request.body.password == 'Nagp@1234'
      ) {
        return of(new HttpResponse({ body: { status: 200 } }));
      } else {
        return of(new HttpResponse({ body: { status: 403 } }));
      }
    }
    next.handle(request);
  }
}
