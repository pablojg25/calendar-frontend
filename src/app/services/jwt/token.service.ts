import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

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
    this.router.navigate(['/login']);
  }

}
