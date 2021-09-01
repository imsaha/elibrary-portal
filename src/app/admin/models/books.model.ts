export interface ISaveBookCommand {
    id?: number;
    title: string;
    description: string;
    isProhibited: boolean;
    rentFee: number;
}

export interface IBook {
    id: number;
    title: string;
    description: string;
    isProhibited: boolean;
    rentFee: number;
}
