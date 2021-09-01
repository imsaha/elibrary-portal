import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private loaderIds: number[] = [];
    public isLoading = this.loaderIds.length > 0;
    private $isLoading = new BehaviorSubject<boolean>(this.loaderIds.length > 0);
    loadingStateChange = this.$isLoading.asObservable().pipe(delay(1));
    constructor() {}

    start() {
        this.loaderIds.push(this.loaderIds.length + 1);
        this.$isLoading.next(this.loaderIds.length > 0);
    }

    stop() {
        this.loaderIds.pop();
        this.$isLoading.next(this.loaderIds.length > 0);
    }
}
