import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof localStorage !== 'undefined' && localStorage.getItem('washndryAuthToken')){
    return true;
  }
  else{
    router.navigate(['login']);
    return false;
  }
};
