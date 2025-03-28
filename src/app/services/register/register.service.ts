import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from './registerRequest';
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { AuthResponse } from '../authResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  currentUserToken: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http:HttpClient) {
    this.currentUserToken = new BehaviorSubject<String>(sessionStorage.getItem("token") || '');
  }

  register(credentials:RegisterRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>("http://localhost:8080/auth/register",credentials).pipe(
      tap( userData => {
        sessionStorage.setItem("token",userData.body.token.valueOf());
        this.currentUserToken.next(userData.body.token);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => new Error("Hubo un error al registrarse"));
  }

  get user():Observable<String> {
    return this.currentUserToken.asObservable();
  }

  get token():String {
    return this.currentUserToken.value;
  }
}
