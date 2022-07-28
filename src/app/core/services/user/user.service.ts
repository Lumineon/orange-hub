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
    // const url = `${this.gitUrl}/search/users?q=${userName}`
    return this.http.get<User>(url).pipe(
      map((response: any) => response)
    );
    // .pipe(catchError(this.handleError('fetch users', [])))
    // .pipe(map((res: any) => res));
  }

  // sortUsers(order: number) {
//   if (this.users){
//     this.users.sort((a : User, b : User) => {
//       try {
//         return order * a.name.localeCompare(b.name);
//       }
//       catch(error) {
//         return -1;
//       }
//     });

//     this.usersSubject.next(this.users);
//   }
// }
}