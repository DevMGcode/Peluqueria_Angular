import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RolGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const rolesPermitidos: string[] = route.data['roles'] ?? [];

        if (this.authService.isAuthenticated() && this.authService.tieneRol(...rolesPermitidos)) {
            return true;
        }

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/']);
        }
        return false;
    }
}
