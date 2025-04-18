import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (sessionStorage.getItem("token") != null) {
    return true;
  }
  router.navigate(['login']);
  return false;
};
