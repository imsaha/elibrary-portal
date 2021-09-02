import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [UserComponent, HomeComponent],
    imports: [UserRoutingModule, CommonModule, SharedModule],
})
export class UserModule {}
