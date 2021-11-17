/* eslint-disable no-redeclare */

interface  Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular
}

const getAllBooks = (): readonly Book[] => {
    const allBooks = <const>[
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript},
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];

    return allBooks;
};

let allBooks = getAllBooks();

const logFirstAvailable = (allBooks: readonly Book[] = getAllBooks()) => {
    console.log(`Amount: ${allBooks.length}`);
    console.log(`First available: ${allBooks.find(book => book.available)?.title}`);
};

logFirstAvailable();

const getBookTitlesByCategory = (category: Category = Category.JavaScript): Array<string> => {
    return allBooks.reduce((acc, item) => {
        category === item.category ? acc.push(item.title) : null;
        return acc;
    }, []);
};
console.log(getBookTitlesByCategory());

console.log('===== 7 =====');
const logBookTitles = (books: readonly Book[]): void => {
    books.forEach(book => console.log(book.title));
};
logBookTitles(allBooks);

const getBookAuthorByIndex = (index: number): [author:string, title:string] => {
    const {author, title} = allBooks[index];
    return [author, title];
};
console.log(`getBookAuthorByIndex: ${getBookAuthorByIndex(1)}`);

const librariesData = <const>[
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
];

const calcTotalPages = (librariesData): BigInt => {
    return librariesData.reduce((acc, libraryInfo) => {
        acc += BigInt(libraryInfo.books * libraryInfo.avgPagesPerBook);
        return acc;
    }, 0n);
};
console.log(calcTotalPages(librariesData));

// 03. Functions
// Task 03.01. Function Type
// const createCustomerID = (name, id) => `${id}-${name}`;
// const myID: string = createCustomerID('Ann', 10);
// console.log(`MyID: ${myID}`);

// let idGenerator: (name: string, id: number) => string;
// idGenerator = (name, id) => `${id}-${name}`;
// idGenerator = createCustomerID;
// console.log(idGenerator('Vasyl', 2));

// Task 03.02. Optional, Default and Rest Parameters
// 1.
const createCustomer = (name: string, age?: number, city?: string): void => {
    const nameOutput = `Name: ${name}. `;
    const ageOutput = `Age: ${age}. `;
    const cityOutput = `City: ${city}.`;
    console.log(`${nameOutput}${age ? ageOutput : ''}${city ? cityOutput : ''}`);
};
createCustomer('Vasyl');
createCustomer('Anna', 20);
createCustomer('Vika', 20, 'Kyiv');

// 4.
const getBookByID = (id: number, books: readonly Book[] = getAllBooks()): Book | undefined => {
    return books.find(book => book.id === id);
};
console.log(getBookByID(1));

// 5.
const checkoutBooks = (customer: string, ...bookIDs: number[]) => {
    console.log(`Customer name: ${customer}`);
    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book?.available)
        .map(book => book.title);
};
// 6.
const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log(myBooks);

//
// Task 03.03. Function Overloading
//

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
const checkedOutBooks = getTitles(false);
console.log('------------- checkedOutBooks:');
console.log(checkedOutBooks);

//
// Task 03.04. Assertion Functions
//

function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Wrong value type');
    }
}
const bookTitleTransform = (title: any): string => {
    assertStringValue(title);
    return [...title].reverse().join('');
};
// console.log(bookTitleTransform('ship'));
// console.log(bookTitleTransform(123));

console.log(`
//
// 04. Interfaces
// Task 04.01. Defining an Interface
//
`);

function printBook(book: Book): string {
    return `${book.title} by ${book.author}`;
}

// 04.02
const logDamage: DamageLogger = message => console.log(`Damage: ${message}`);

let myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: logDamage
};


console.log(printBook(allBooks[0]));
myBook.markDamaged('missing back cover');


console.log(`
//
// Task 04.02. Defining an Interface for Function Types
//
`);

interface DamageLogger {
    (value: string): void;
}


console.log(`
//
// Task 04.03. Extending Interface
//
`);

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

const favoriteAuthor: Author = {
    name: 'Wan John',
    email: 'ever@best.email',
    numBooksPublished: 1
};

const favoriteLibrarian: Librarian = {
    name: 'Melisa Li',
    email: 'melisa@mail.com',
    department: 'Sci-fi',
    assistCustomer: function(custName) {
        console.log(`${this.name} assists ${custName}`);
    }
};

console.log(`
//
// Task 04.04. Optional Chaining
//
`);

const offer: any = {
    book: {
        title: 'Essential Typescript',
    },
};
console.log(offer?.magazine);
console.log(offer?.magazine?.getTitle());
console.log(offer.book?.getTitle?.());
console.log(offer.book?.authors?.[0]);


console.log(`
//
// Task 04.05. Keyof Operator
//
`);
type BookProperties = keyof Book;

function getProperty(book: Book, prop: BookProperties): any {
    if (typeof book[prop] === 'function') {
        return book[prop]['name'];
    }
    return book[prop];
}

console.log(getProperty(allBooks[0], 'title'));
console.log(getProperty(allBooks[0],'markDamaged'));
// getProperty(allBooks[0], 'isbn');

console.log(`
//
// 05. Classes
// Task 05.01. Creating and Using Classes
//
`);

class ReferenceItem {
    // title: string;
    // year: number;
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    private _publisher: string;
    #id: number;
    static department: string = 'Classic literature';

    get publisher(): string {
        // eslint-disable-next-line no-underscore-dangle
        return this._publisher.toLocaleUpperCase();
    }
    set publisher(newPublisher) {
        // eslint-disable-next-line no-underscore-dangle
        this._publisher = newPublisher;
    }

    constructor(id: number, public title: string, private year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    getId(): number {
        return this.#id;
    }
}
const ref: ReferenceItem = new ReferenceItem(1, 'TypeScript', 2021);
console.log(ref);
ref.printItem();
ref.publisher = 'asd';
console.log(ref.publisher);
console.log(ref.getId());
