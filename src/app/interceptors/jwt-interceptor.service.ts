import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/jwt/token.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  token:String = '';
  private excludedRoutes = ['/auth/login', '/auth/register'];

  constructor(private tokenService:TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.excludedRoutes.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    this.tokenService.checkTokenValidity();

    let token = sessionStorage.getItem("token");

    if (token) {
      let clonedReq=req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      return next.handle(clonedReq);
    }
    return next.handle(req);

  }
}
