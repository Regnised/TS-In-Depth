/* eslint-disable no-redeclare */

import { Book, Callback } from './interfaces';
import { Category } from './enums';
import { BookOrUndefined } from './types';
import RefBook from './classes/encyclopedia';

const getAllBooks = (): readonly Book[] => {
    const allBooks = <const>[
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript},
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];

    return allBooks;
};

const logFirstAvailable = (allBooks: readonly Book[] = getAllBooks()) => {
    console.log(`Amount: ${allBooks.length}`);
    console.log(`First available: ${allBooks.find(book => book.available)?.title}`);
};

const getBookTitlesByCategory = (category: Category = Category.JavaScript): Array<string> => {
    return getAllBooks().reduce((acc, item) => {
        category === item.category ? acc.push(item.title) : null;
        return acc;
    }, []);
};

const logBookTitles = (books: readonly Book[]): void => {
    books.forEach(book => console.log(book.title));
};

const getBookAuthorByIndex = (index: number): [author:string, title:string] => {
    const {author, title} = getAllBooks()[index];
    return [author, title];
};

const calcTotalPages = (librariesData): BigInt => {
    return librariesData.reduce((acc, libraryInfo) => {
        acc += BigInt(libraryInfo.books * libraryInfo.avgPagesPerBook);
        return acc;
    }, 0n);
};

const createCustomer = (name: string, age?: number, city?: string): void => {
    const nameOutput = `Name: ${name}. `;
    const ageOutput = `Age: ${age}. `;
    const cityOutput = `City: ${city}.`;
    console.log(`${nameOutput}${age ? ageOutput : ''}${city ? cityOutput : ''}`);
};

const getBookByID = (id: number, books: readonly Book[] = getAllBooks()): BookOrUndefined => {
    return books.find(book => book.id === id);
};

const checkoutBooks = (customer: string, ...bookIDs: number[]) => {
    console.log(`Customer name: ${customer}`);
    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book?.available)
        .map(book => book.title);
};

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]): string[] {
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books
                .filter(book => book.author === arg)
                .map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books
                .filter(book => book.available === arg)
                .map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books
                .filter(book => book.available === available && book.id === id)
                .map(book => book.title);
        }
    }
};

function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Wrong value type');
    }
}

const bookTitleTransform = (title: any): string => {
    assertStringValue(title);
    return [...title].reverse().join('');
};

// export function getProperty(book: Book, prop: BookProperties): any {
//     if (typeof book[prop] === 'function') {
//         return book[prop]['name'];
//     }
//     return book[prop];
// }

export function getProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    if (typeof obj[prop] === 'function') {
        return obj[prop]['name'];
    }
    return obj[prop];
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw Error('It\'s not instance of RefBook');
    }
}
// 06.03
export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
};

// export function getBookByCategory(category: Category, callback: LibMgrCallback): void {
export function getBookByCategory(category: Category, callback: Callback<string[]>): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                return callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (e) {
            callback(e, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            }
            reject(new Error('No books found'));
        }, 2000);
    });
}

export async function logSearchResults(category: Category): Promise<void> {
    const books = await getBooksByCategoryPromise(category);
    console.log(`Books amount: ${books.length}`);
}

export {
    getAllBooks,
    logFirstAvailable,
    getBookTitlesByCategory,
    logBookTitles,
    getBookAuthorByIndex,
    calcTotalPages,
    createCustomer,
    getBookByID,
    checkoutBooks,
    getTitles,
    assertStringValue,
    bookTitleTransform,
};
