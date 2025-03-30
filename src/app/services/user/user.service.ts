import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserDeleteResponse } from '../../models/userDeleteResponse';
import { User } from '../../models/user';
import { UserResponse } from '../../models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<UserResponse>(environment.urlApi + "/users").pipe(
      map(response => {return response.body}),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<void> {
    return this.http.delete<UserDeleteResponse>(environment.urlApi + "/users").pipe(
      map(response => {return response.body}),
      catchError(this.handleError)
    );
  }

  changeVisibility(): Observable<User> {
    return this.http.put<UserResponse>(environment.urlApi + "/users",'').pipe(
      map(response => {return response.body}),
      catchError(this.handleError)
    );
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => new Error("Hubo un error al borrar el usuario"));
  }
}
