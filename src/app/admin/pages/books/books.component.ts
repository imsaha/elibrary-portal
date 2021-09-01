import { Component, OnInit } from '@angular/core';
import { IBook } from '../../models/books.model';
import { BooksService } from '../../services/books/books.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { LoaderService } from '../../../shared/services/loader/loader.service';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
    books: IBook[] = [];
    displayedColumns: string[] = ['id', 'title', 'description', 'symbol'];

    constructor(
        private bookService: BooksService,
        private alertService: AlertService,
        private loaderService: LoaderService
    ) {}

    async ngOnInit(): Promise<void> {
        // try {
        //     this.books = await this.bookService.getBooks();
        // } catch (error) {
        //     console.log(error);
        // }
    }

    async loadData() {
        const result = await this.alertService.confirm('Are you sure, you want to load the data?');
        if (result.isConfirmed) {
            this.books = await this.bookService.getBooks();
        } else {
            await this.alertService.failed('You have chosen not to load data!');
        }
    }

    async handleOpenAlert() {
        this.loaderService.start();
        const result = await this.alertService.confirm('Are you sure, you want to test this?');
        await this.alertService.success('You have selected ' + result.value);
    }
}
