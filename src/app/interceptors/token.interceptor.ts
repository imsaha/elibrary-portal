import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.getToken()).pipe(
            mergeMap((token) => {
                const req = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (!token || token == null) {
                    return next.handle(req);
                }

                const isExpired = new Date(token.expiry).getTime() < new Date().getTime();
                if (isExpired) {
                    // TODO implement refresh token
                }

                return next.handle(
                    req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token.token}`,
                        },
                    })
                );
            })
        );
    }
}
