import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private accountService: AccountService, private router: Router) {}

  private checkRoles(expectedRoles: string[], userRoles: string[] = []): boolean {
    console.log('[RoleGuard] Expected Roles:', expectedRoles);
    console.log('[RoleGuard] User Roles:', userRoles);

    if (!expectedRoles.length) return true; // pas de rôle défini = accès autorisé

    const hasRole = userRoles.some(role => expectedRoles.includes(role));
    if (!hasRole) {
      this.router.navigate(['/app-forbidden']);
    }
    return hasRole;
  }

  private logTokenInfo() {
    const token = localStorage.getItem('token');
    console.log('[RoleGuard] Token brut:', token);

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        console.log('[RoleGuard] Payload décodé:', decoded);
        console.log('[RoleGuard] Roles depuis le token:', decoded.roles);
        console.log('[RoleGuard] ID utilisateur:', decoded.id);
      } catch (err) {
        console.error('[RoleGuard] Erreur décodage token:', err);
      }
    } else {
      console.log('[RoleGuard] Aucun token trouvé');
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.logTokenInfo();

    const expectedRoles: string[] = route.data['roles'] || route.parent?.data['roles'] || [];
    const currentUser = this.accountService.getCurrentUser();

    if (currentUser) {
      return of(this.checkRoles(expectedRoles, this.accountService.getRoles()));
    }

    return this.accountService.loadUser().pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return this.checkRoles(expectedRoles, this.accountService.getRoles());
      })
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
