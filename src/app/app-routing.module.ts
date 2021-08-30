import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/welcome' },
    {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Welcome',
        },
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
        data: {
            breadcrumb: 'Auth',
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
