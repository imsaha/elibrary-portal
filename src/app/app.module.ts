import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './interceptors/token.interceptor';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ApiLoaderInterceptor } from './interceptors/loader.Interceptor';
import { ApiVersionInterceptor } from './interceptors/version.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        SweetAlert2Module.forRoot(),
        SharedModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiLoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ApiVersionInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
