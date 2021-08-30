import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [LoginComponent, AuthComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
