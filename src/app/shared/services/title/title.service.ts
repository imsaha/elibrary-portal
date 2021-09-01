import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    readonly PREFIX = 'Application - ';
    constructor(public title: Title) {}

    setTitle(titleText: string): void {
        this.title.setTitle(this.PREFIX + titleText);
    }

    getTitle(): string {
        return this.title.getTitle();
    }
}
