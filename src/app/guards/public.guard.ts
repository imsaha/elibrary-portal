import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class PublicGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    // TODO to be implement
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.getAuthState().pipe(
            map((x) => {
                if (x !== null) {
                    this.router.navigate(['/auth'], { queryParams: { ret: state.url } });
                }
                return x != null && !x.isAnonymous;
            })
        );
    }
}
