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

const hp = new Book('Harry Potter', 'JK Rowling', 500, 'not read yet');

const republic = new Book('Republic', 'Plato', 350, 'read');

addBookToLibrary(hp);

console.log(myLibrary);

function updateLibrary(library) {
    const libraryContainer = document.getElementById('library-container');
    const books = Array.from(libraryContainer.children);

    for (let i = 0; i < library.length; i++) {
        if (!books.includes(library[i])) {
            let d = document.createElement('div');
            d.innerHTML = (`${library[i].title}`);
            libraryContainer.appendChild(d);
        }   
    }
}

updateLibrary(myLibrary);