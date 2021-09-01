import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { Observable } from 'rxjs';
import { LoaderService } from '../shared/services/loader/loader.service';

@Injectable()
export class ApiLoaderInterceptor implements HttpInterceptor {
    constructor(private loader: LoaderService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.loader.isLoading) {
            this.loader.start();
        }
        return next.handle(request).pipe(
            finalize(() => {
                this.loader.stop();
            })
        );
    }
}
