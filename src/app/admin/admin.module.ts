import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { BooksComponent } from './pages/books/books.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [BooksComponent, AdminComponent],
    imports: [CommonModule, AdminRoutingModule, SharedModule],
    providers: [],
})
export class AdminModule {}
