import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/LoginRequest';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserToken: BehaviorSubject<String>;

  constructor(private http:HttpClient) {
    this.currentUserToken = new BehaviorSubject<String>(sessionStorage.getItem("token") || '');
  }

  login(credentials:LoginRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>("http://localhost:8080/auth/login",credentials).pipe(
      tap( userData => {
        sessionStorage.setItem("token",userData.body.token.valueOf());
        this.currentUserToken.next(userData.body.token);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => new Error("Hubo un error al iniciar sesión"));
  }

  get user():Observable<String> {
    return this.currentUserToken.asObservable();
  }
  
}
