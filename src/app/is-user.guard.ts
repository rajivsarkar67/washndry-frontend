import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isUserGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    if(localStorage.getItem('washndryUserType') === 'user'){
      return true;
    }
    else{
      return false;
    }
};
