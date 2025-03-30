import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private userLoggedIn = new BehaviorSubject<boolean>(this.getToken()!=null);

  constructor(private router: Router) {}

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      
      if (!decodedToken.exp) {
        return false;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false;
    }
  }

  checkTokenValidity(): void {
    if (!this.isTokenValid()) {
      console.warn('Token inválido o expirado. Cerrando sesión...');
      this.logout();
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.userLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  updateAuthStatus(loggedIn: boolean): void {
    if (!loggedIn) {
      sessionStorage.removeItem("token");
    }
    this.userLoggedIn.next(loggedIn);
  }

  getUserLoggedIn():Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

}
