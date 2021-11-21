import { Category } from './enums';

interface  Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}

type t = Book['title'];

interface DamageLogger {
    (value: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface Magazine {
    title: string;
    publisher: string;
}

export interface ShelfItem {
    title: string;
}

export interface LibMgrCallback {
    (err: Error, titles: string[]): void;
}

export interface Callback<T> {
    (err: Error, data: T): void;
}

export {Person, Librarian, Book, Author, DamageLogger as Logger, Magazine};
