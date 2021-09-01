import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../components/loading-dialog/loading-dialog.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
    $sub: undefined | Subscription;
    constructor(private loader: LoaderService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.$sub = this.loader.loadingStateChange.subscribe((resp) => {
            if (resp) {
                this.dialog.open(LoadingDialogComponent, {
                    disableClose: true,
                    closeOnNavigation: false,
                });
            } else {
                this.dialog.closeAll();
            }
        });
    }

    ngOnDestroy() {
        if (this.$sub) {
            this.$sub.unsubscribe();
        }
    }
}
