import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService, IAuthService, IAuthStatus } from '../../auth/auth.service';
import { CacheService } from '../../auth/cache.service';
import { environment } from '../../../environments/environment';
import { transformError } from '../../common/common';
import { User, IUser } from './user';

export interface IUsers {
  items: IUser[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends CacheService {
  currentUser = new BehaviorSubject<IUser>(this.getItem('user') || new User());
  private currentAuthStatus: IAuthStatus;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
    this.currentUser.subscribe(user => this.setItem('user', user));
    this.authService.authStatus.subscribe(authStatus => (this.currentAuthStatus = authStatus));
  }

  getCurrentUser(): Observable<IUser> {
    const userObservable = this.getUser(this.currentAuthStatus.userId).pipe(catchError(transformError));
    userObservable.subscribe(user => this.currentUser.next(user), err => Observable.throw(err));
    return userObservable;
  }

  getUser(id): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.baseUrl}/v1/user/${id}`);
  }

  getUsers(pageSize: number, searchText = '', pagesToSkip = 0): Observable<IUsers> {
    return this.httpClient.get<IUsers>(`${environment.baseUrl}/v1/users`, {
      params: {
        search: searchText,
        offset: pagesToSkip.toString(),
        limit: pageSize.toString(),
      }
    });
  }

  updateUser(user: IUser): Observable<IUser> {
    this.setItem('draft-user', user); // cache user data in case of errors;

    const updateResponse = this.httpClient.put<IUser>(`${environment.baseUrl}/v1/user/${user.id || 0}`, user)
    .pipe(catchError(transformError));

    updateResponse.subscribe(res => {
      this.currentUser.next(res);
      this.removeItem('draft-user');
    }, err => Observable.throw(err));

    return updateResponse;
  }
}
