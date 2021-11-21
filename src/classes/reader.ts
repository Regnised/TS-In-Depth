import { Book } from '../interfaces';

export const Reader = class Reader {
    name: string;
    book: Book[] = [];

    take(book: Book): void {
        (this.book ??= []).push(book);
    }
};
