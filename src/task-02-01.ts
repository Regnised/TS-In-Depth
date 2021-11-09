interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular
}

const run = () => {
    const getAllBooks = (): Book[] => {
        const allBooks: Book[] = [
            { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
            { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript},
            { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
            { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
        ];

        return allBooks;
    };

    const allBooks = getAllBooks();

    const logFirstAvailable = (allBooks: Book[]) => {
        console.log(`Amount: ${allBooks.length}`);
        console.log(`First available: ${allBooks.find(book => book.available)?.title}`);
    };

    logFirstAvailable(allBooks);

    console.log('===== 6 =====');
    const getBookTitlesByCategory = (category: Category): Array<string> => {
        return allBooks.reduce((acc, item) => {
            category === item.category ? acc.push(item.title) : null;
            return acc;
        }, []);
    };
    console.log(getBookTitlesByCategory(Category.JavaScript));

    console.log('===== 7 =====');
    const logBookTitles = (books: Book[]): void => {
        books.forEach(book => console.log(book.title));
    };
    logBookTitles(allBooks);

    console.log('===== 8, 9 =====');
    const getBookAuthorByIndex = (index: number): [author:string, title:string] => {
        return [allBooks[index].author, allBooks[index].title];
    };
    console.log(getBookAuthorByIndex(1));

    console.log('===== 10 =====');
    const librariesData = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];
    const calcTotalPages = (librariesData: {books: number; avgPagesPerBook: number}[]): BigInt => {
        return librariesData.reduce((acc, libraryInfo) => {
            acc += BigInt(libraryInfo.books + libraryInfo.avgPagesPerBook);
            return acc;
        }, 0n);
    };
    console.log(calcTotalPages(librariesData));

};

export default {
    run,
};

