import { Author, Book, Person } from './interfaces';
import { createCustomer, getBooksByCategoryPromise } from './functions';

type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;
type BookProperties = keyof Book;

type BookRequiredFields = Required<Book>;
type UpdatedBook = Partial<Book>;
type AuthorWOEmail = Omit<Author, 'email'>;
// type CreateCustomerFunctionType = (name: string, age?: number, city?: string) => void;
type CreateCustomerFunctionType = typeof createCustomer;

type fn = (p1: string, p2: number, p3: boolean) => symbol;
type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

export type Unpromisify<T> = T extends Promise<infer R> ? R : never;
export type FT = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>;

export {
    Param1,
    Param2,
    Param3,
    PersonBook,
    BookProperties,
    BookOrUndefined,
    BookRequiredFields,
    UpdatedBook,
    AuthorWOEmail,
    CreateCustomerFunctionType,
    fn,
};
