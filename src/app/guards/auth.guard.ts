import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { RegisterService } from '../services/register/register.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  const registerService = inject(RegisterService);
  console.log("Llega al guarda");
  if (sessionStorage.getItem("token") != null) {
    console.log("Token obtenido",sessionStorage.getItem("token"));
    return true;
  }
  console.log("No se obtuvo el token");
  router.navigate(['login']);
  return false;
};
