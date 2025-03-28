import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterService } from '../register/register.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  token:String = '';

  constructor(private loginService:LoginService, private registerService:RegisterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");

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
