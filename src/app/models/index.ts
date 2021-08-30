export class ApiResponse<T> {
    constructor(isSuccess: boolean, data?: T) {
        this.isSuccess = isSuccess;
        this.data = data;
    }

    isSuccess: boolean;
    data?: T;
}
