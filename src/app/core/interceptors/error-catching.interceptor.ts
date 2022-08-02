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
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    console.log(errorMsg);
                    return throwError(() => error);
                })
            )
    }

    intercept1(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
      return next.handle(req).pipe(
        catchError((error) => {
          let errorMsg = '';
          let handled: boolean = false;
          if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
            } else {
              switch (error.status) {
                case 408:     //timeout
                  errorMsg = `Erro: ${error.status}, Timeout! /n Recarregue a página e tente novamente`;
                  handled = true;
                  break;
              }
            }
          }

          if (handled) {
            return of(error);
          } else {
            return throwError(() => errorMsg);
          }
        })
      )
    }
}
