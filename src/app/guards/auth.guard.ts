import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { from, merge, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const token = await this.authService.getToken();
        if (token === null) {
            this.router.navigate(['/auth'], { queryParams: { ret: state.url } });
            return false;
        }

        const role = await this.authService.getUserActingRole();
        if (role == undefined) {
            this.router.navigate(['/access-denied'], { queryParams: { ret: state.url } });
            return false;
        }

        return true;
    }
}
