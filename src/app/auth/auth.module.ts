import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
    declarations: [AuthComponent, LoginComponent],
    imports: [AuthRoutingModule, SharedModule],
    providers: [AuthService],
})
export class AuthModule {}
