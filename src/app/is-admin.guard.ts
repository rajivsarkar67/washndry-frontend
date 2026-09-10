import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isAdminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    if (typeof localStorage !== 'undefined' && localStorage.getItem('washndryUserType') === 'admin'){
      return true;
    }
    else{
      return false;
    }
};
