import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleService } from 'src/app/shared/services/title/title.service';
import { AlertService } from './services/alert/alert.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoaderComponent } from './services/loader/loader.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';

const modules = [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SweetAlert2Module,
];

@NgModule({
    declarations: [LoaderComponent, LoadingDialogComponent],
    imports: [modules],
    exports: [modules, LoaderComponent],
    providers: [TitleService, AlertService],
})
export class SharedModule {}
