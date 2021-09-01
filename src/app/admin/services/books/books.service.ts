import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { IResult } from 'src/app/shared/models';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBook, ISaveBookCommand } from '../../models/books.model';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    constructor(private http: HttpClient) {}

    getBooks(): Promise<IBook[]> {
        const obs = this.http
            .get<IResult<IBook[]>>(`${environment.apiBase}/books`)
            .pipe(map((i) => i.data));

        return firstValueFrom(obs);
    }

    createBook(book: ISaveBookCommand): Observable<number | undefined> {
        return this.http
            .post<IResult<number>>(`${environment.apiBase}/books`, book)
            .pipe(map((r) => r.data));
    }
}
