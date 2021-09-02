import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class PublicGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const token = await this.authService.getToken();
        if (token == null || token == undefined) {
            return true;
        }

        const role = await this.authService.getUserActingRole();
        switch (role) {
            case 'admin':
                this.router.navigate(['/admin'], { queryParams: { ret: state.url } });
                break;
            case 'user':
                this.router.navigate(['/user'], { queryParams: { ret: state.url } });
                break;
            case undefined:
                this.router.navigate(['/access-denied'], {
                    queryParams: { ret: state.url },
                });
                break;
        }

        return false;
    }
}
