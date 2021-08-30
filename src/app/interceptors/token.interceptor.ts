import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.getAuthState().pipe(
            mergeMap((fbUser) => {
                if (fbUser) {
                    return from(fbUser.getIdTokenResult(true)).pipe(
                        mergeMap((tokenResponse) => {
                            return next.handle(
                                request.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${tokenResponse.token}`,
                                    },
                                })
                            );
                        })
                    );
                } else {
                    return next.handle(request);
                }
            })
        );
    }
}
