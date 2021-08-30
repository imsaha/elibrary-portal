import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
