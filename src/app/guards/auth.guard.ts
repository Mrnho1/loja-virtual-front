import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.parseUrl('/login');
  }

  const roles = route.data['roles'] as string[] | undefined;
  if (roles && !roles.includes(authService.getUserRole()!)) {
    return router.parseUrl('/unauthorized');
  }

  return true;
};
