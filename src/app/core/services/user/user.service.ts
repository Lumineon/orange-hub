import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators'
import { User } from '../../models/user';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  gitUrl = 'https://api.github.com';

  getUser(userName: string): Observable<User> {
    const url = `${this.gitUrl}/users/${userName}`
    return this.http
      .get<User>(url)
      // .pipe(retry(1), catchError(this.handleError));
  }

  getStars(userName: string): Observable<Array<Object>> {
    const url = `${this.gitUrl}/users/${userName}/starred`
    return this.http
      .get<Array<Object>>(url)
      // .pipe(retry(1), catchError(this.handleError));
  }

  // handleError(error:any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Erro: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Erro na request \n ${error.status} + ${error.message}`;
  //   }
  //   return throwError(() => {
  //       return errorMessage;
  //   });
  // }
}
