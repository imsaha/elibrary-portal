import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const userActingRole = await this.authService.getUserActingRole();

        if (userActingRole !== 'admin') {
            this.router.navigate(['/access-denied'], { queryParams: { ret: state.url } });
            return false;
        } else {
            return true;
        }
    }
}
