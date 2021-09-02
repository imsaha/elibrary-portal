import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { PublicGuard } from './guards/public.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'auth' },
    { path: 'access-denied', component: AccessDeniedComponent },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [PublicGuard],
        data: {
            breadcrumb: 'Auth',
        },
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard, AdminGuard],
        data: {
            breadcrumb: 'Admin',
        },
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard, UserGuard],
        data: {
            breadcrumb: 'User',
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
