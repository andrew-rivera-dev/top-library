let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const hp = new Book('Harry Potter', 'JK Rowling', 500, 'Incomplete');

const republic = new Book('Republic', 'Plato', 350, 'Complete');

addBookToLibrary(hp);
addBookToLibrary(republic);

function updateLibrary(library) {
    const libraryContainer = document.getElementById('library-container');
    const books = Array.from(libraryContainer.children);

    for (let i = 0; i < library.length; i++) {
        if (!books.includes(library[i])) {
            let d = document.createElement('div');
            d.className = 'book';

            for (let key in library[i]) {
                d.innerHTML += library[i][key] + '\n';
                libraryContainer.appendChild(d);
            }
        }   
    }
}

updateLibrary(myLibrary);