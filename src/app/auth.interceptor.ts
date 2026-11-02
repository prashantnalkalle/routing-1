import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    AppComponent.startLoading();

    const token = this.auth.gettoken();
    // This JWT is issued by our auth API. Firebase Realtime Database does not
    // trust it, so only send it to that API (not to Firebase URLs).
    const isAuthApiRequest = request.url.startsWith(this.auth.Auth_url);
    const authenticatedRequest = token && isAuthApiRequest
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

    return next.handle(authenticatedRequest).pipe(
      finalize(() => AppComponent.stopLoading())
    );
  }
}
