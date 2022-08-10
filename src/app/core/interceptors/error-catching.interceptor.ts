import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {catchError, map} from "rxjs/operators";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  return next.handle(request)
    .pipe(
        map(res => {
            return res
        }),
        catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof Error) {
                console.log('client-side or network error occurred');
                errorMsg = `Error: ${error.error.message}`;
            } else if (error.status === 0){
              errorMsg = `Internet Error! Failed HTTP request.`;
            } else {
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }
            console.log(errorMsg);
            return throwError(() => error);
        })
    )
  }
}
