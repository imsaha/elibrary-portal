import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor() {}

    public alert(options: SweetAlertOptions) {
        const baseOptions = {
            confirmButtonText: 'OK',
        };
        return swal.fire({ ...baseOptions, ...options });
    }

    success(message: string, title: string = 'Successful'): Promise<SweetAlertResult<any>> {
        return this.alert({ icon: 'success', title, text: message });
    }

    failed(message: string, title: string = 'Oops!'): Promise<SweetAlertResult<any>> {
        return this.alert({ icon: 'error', title, text: message });
    }

    confirm(
        message: string,
        titleText = 'Are you sure?',
        confirmBtnText = 'Sure'
    ): Promise<SweetAlertResult<any>> {
        return this.alert({
            showCancelButton: true,
            confirmButtonText: confirmBtnText,
            icon: 'warning',
            title: titleText,
            text: message,
        });
    }
}
