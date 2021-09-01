export class Exception {
    constructor(messageText?: string) {
        this.message = messageText ?? '';
    }

    message: string;
}
