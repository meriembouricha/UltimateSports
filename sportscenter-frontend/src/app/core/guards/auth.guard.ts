import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  // Vérifier si l'utilisateur est authentifié
  if (accountService.isAuthenticated()) {
    // Récupérer l'utilisateur courant via la méthode publique
    const currentUser = accountService.getCurrentUser(); 

    // Vérifier le rôle de l'utilisateur et l'accès à la route
    if (currentUser?.role === 'ROLE_ADMIN' || route.routeConfig?.path !== 'admin') {
      // Si l'utilisateur est un admin ou si la route n'est pas '/admin', autoriser l'accès
      return true;
    } else {
      // Sinon, rediriger l'utilisateur vers une autre page, par exemple /store
      return router.createUrlTree(['/store']); 
    }
  } else {
    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
    accountService.redirectUrl = state.url;
    return router.createUrlTree(['/account/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
};
