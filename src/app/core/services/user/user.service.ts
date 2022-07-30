import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  gitUrl = 'https://api.github.com';

  getUsers(userName: string): Observable<User> {
    const url = `${this.gitUrl}/users/${userName}`
    return this.http.get<User>(url).pipe(
      map((response: any) => response)
    );
  }
  
  getStars(userName: string): Observable<Array<Object>> {
    const url = `${this.gitUrl}/users/${userName}/starred`
    return this.http.get<Array<Object>>(url).pipe(
      map((response: any) => response)
    );
  }
}