import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  private REFRESH_URL = 'http://localhost:3000/api/auth/refresh-token'

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      }
    })

    return next.handle(request).pipe(
      catchError<any, any>(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.reAuthenticate().pipe(
            switchMap(() => {
              return next.handle(request)
            })
          )
        } else {
          this.router.navigate(['login'])
          return
        }
      })
    )
  }

  reAuthenticate(): Observable<any> {
    return this.http.post<any>(this.REFRESH_URL, { refreshToken: this.auth.getRefreshToken() }).pipe(
      catchError<any, any>(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.router.navigate(['login'])
          return
        }
        return throwError(err)
      }),

      tap({
        next: res => this.auth.setAccessToken(res.accessToken)
      })
    )
  }
}
