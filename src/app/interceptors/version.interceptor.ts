import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiVersionInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.setUrl(request));
    }

    private setUrl(req: HttpRequest<any>): HttpRequest<any> {
        const apiVersion = environment.apiVersion;
        const versionExists = req.headers.get('version');
        if (versionExists === null) {
            req = req.clone({
                setHeaders: {
                    version: apiVersion,
                },
            });
        }
        return req;
    }
}
