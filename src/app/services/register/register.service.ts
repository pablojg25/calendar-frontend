import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../models/registerRequest';
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { AuthResponse } from '../../models/authResponse';
import { TokenService } from '../jwt/token.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  currentUserToken: BehaviorSubject<String>;

  constructor(private http:HttpClient, private tokenService:TokenService) {
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

}
