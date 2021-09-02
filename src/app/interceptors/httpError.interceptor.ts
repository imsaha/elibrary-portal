import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../shared/services/alert/alert.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private alert: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                const message = error?.message ?? 'Something went wrong!';
                this.alert.failed(message);
                return throwError(() => error);
            })
        );
    }
}
