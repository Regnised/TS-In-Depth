import { Category } from './enums';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';
import { RefBook, Shelf, UL } from './classes';
import { PersonBook } from './types';
import {
    calcTotalPages,
    checkoutBooks,
    createCustomer,
    getAllBooks,
    getBookAuthorByIndex,
    getBookByID,
    getBooksByCategoryPromise,
    getBookTitlesByCategory,
    getProperty,
    getTitles,
    logBookTitles,
    logFirstAvailable, logSearchResults,
} from './functions';
// 06.06
// import { Library } from './classes/library';
// import { Library } from './classes';
import type { Library } from './classes/library';

let allBooks = getAllBooks();

logFirstAvailable();

console.log(getBookTitlesByCategory());

console.log('===== 7 =====');
logBookTitles(allBooks);

console.log(`getBookAuthorByIndex: ${getBookAuthorByIndex(1)}`);

const librariesData = <const>[
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
];

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
createCustomer('Vasyl');
createCustomer('Anna', 20);
createCustomer('Vika', 20, 'Kyiv');

// 4.
console.log(getBookByID(1));

// 6.
const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log(myBooks);

//
// Task 03.03. Function Overloading
//
const checkedOutBooks = getTitles(false);
console.log('------------- checkedOutBooks:');
console.log(checkedOutBooks);

//
// Task 03.04. Assertion Functions
//
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
const logDamage: Logger = message => console.log(`Damage: ${message}`);
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
// Task 04.03. Extending Interface
//
`);
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
console.log(getProperty(allBooks[0], 'title'));
console.log(getProperty(allBooks[0],'markDamaged'));
// getProperty(allBooks[0], 'isbn');

console.log(`
// 05. Classes
// Task 05.01. Creating and Using Classes
`);
// const ref: ReferenceItem = new ReferenceItem(1, 'TypeScript', 2021);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'asd';
// console.log(ref.publisher);
// console.log(ref.getId());

console.log(`
// Task 05.02. Extending Classes
`);

// const refBook = new Encyclopedia(1, 'Typescript', 2021, 2);
// const refBook = new RefBook(1, 'Typescript', 2021, 2);
// console.log(refBook);
// refBook.printItem();

console.log(`
// Task 05.03. Creating Abstract Classes
`);
const refBook = new RefBook(1, 'Typescript', 2021, 2);
// printRefBook(refBook); // 06.03
refBook.printCitation();

// 06.03
// const uLibrarian = new UL.UniversityLibrarian();
// printRefBook(uLibrarian);

console.log(`
// Task 05.04. Interfaces for Class Types
`);
const favouriteLibrarian: UL.UniversityLibrarian = new UL.UniversityLibrarian();
favouriteLibrarian.name = 'Vasyl';
favouriteLibrarian.assistCustomer('Viktoriya');

console.log(`
// Task 05.05. Intersection and Union Types
`);
const person: PersonBook = {
    name: 'Vasyl',
    email: 'test@mail.com',
    id: 1,
    author: 'Vasyl',
    available: false,
    category: Category.CSS,
    title: 'CSS Essentials'
};

// 06.05
const flag = true;
if (flag) {
    const readerLib = await import('./classes/reader');
    const reader = new readerLib.Reader();
    reader.name = 'Vasyl';
    reader.take(getAllBooks()[0]);
    console.log(reader);
}

// const lib: Library = new Library();
const lib: Library = {
    name: 'Vasyl',
    id: 1,
    address: 'test'
};

// 7.01
const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];
// let result = purge(inventory);
// console.log(result);
// let result2 = purge([1,2,3]);
// console.log(result2);

// 07.02
const bookShelf = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst().title);

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
const magazineShelf = new Shelf<Magazine>();
magazines.forEach(mag => magazineShelf.add(mag));
console.log(magazineShelf.getFirst().title);

// 07.03
// magazineShelf.printTitles();
// console.log(magazineShelf.find('Five Points'));

console.log(getProperty(getAllBooks()[0],'title'));

// 07.04
// const bookReqiredFields: BookRequiredFields = {
//     id: 1,
//     author: 'Vasyl',
//     available: true,
//     category: Category.CSS,
//     title: 'Css',
//     pages: 122,
//     markDamaged: value => {}
// };
// const updatedBook: UpdatedBook = {};

// let params: Parameters<CreateCustomerFunctionType>;
let params: Parameters<typeof createCustomer> = ['Anna', 30, 'Kyiv'];
createCustomer(...params);

// 08.01
// const ul = new UL.UniversityLibrarian();
// console.log(ul);
// UL.UniversityLibrarian['a'] = 'A';
// ul.assistCustomer = () => {};
// const pr = Object.getPrototypeOf(ul);
// console.log(pr);
// pr.assistCustomer = () => {};

// 08.02
// const ul = new UL.UniversityLibrarian();
// ul.name = 'Anna';
// ul['printLibrarian']();
// console.log(ul);

// 08.03
// const ul = new UL.UniversityLibrarian();
// ul.assistFaculty = null;
// ul.teachCommunity = null;

// 08.04
// const enc = new RefBook(1, 'Title', 2021, 3);
// enc.printItem();

// 08.05
// const ul = new UL.UniversityLibrarian();
// ul.name = 'Anna';
// ul.assistCustomer('Vasyl');

// 08.06
// const ul = new UL.UniversityLibrarian();
// ul.name = 'Anna';
// console.log(ul.name);
// ul.assistCustomer('Vasyl');
// console.log(ul);

// 08.07
// const enc = new RefBook(1, 'Title', 2021, 3);
// enc.copies = 10;
// console.log(enc);

// 09.01
// console.log('Begin');
// getBookByCategory(Category.JavaScript, logCategorySearch);
// getBookByCategory(Category.Software, logCategorySearch);
// console.log('End');

// 09.02
// console.log('Begin');
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => {
//         console.log(titles);
//         return titles.length;
//     })
//     .then(len => {
//         console.log(`LEN: ${len}`);
//     })
//     .catch(console.error);
// getBooksByCategoryPromise(Category.Software)
//     .then(console.log)
//     .catch(console.error);
// console.log('End');

// 09.03
console.log('Begin');
logSearchResults(Category.Software)
    .catch(e => console.log(e));
console.log('End');
