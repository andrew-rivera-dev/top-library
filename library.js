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
updateLibrary(myLibrary);

function createBookCard(book) {
    const d = document.createElement('div');
    d.className = 'book';

    const title = document.createElement('h3');
    title.innerHTML =  book.title; 
    d.appendChild(title);

    const author = document.createElement('span');
    author.innerHTML = 'Author: ' + book.author; 
    d.appendChild(author);

    const pages = document.createElement('span');
    pages.innerHTML = 'Number of pages: ' + book.pages; 
    d.appendChild(pages);

    const read = document.createElement('span');
    read.innerHTML = 'Read Status: ' + book.read; 
    d.appendChild(read);

    const children = Array.from(d.children);

    for (let i = 0; i < children.length; i++) {
        children[i].className = 'book-info';
    }

    return d;
}

function updateLibrary(library) {
    const libraryContainer = document.getElementById('library-container');

    let col = 1, row = 1;

    for (let i = 0; i < library.length; i++) {
        let newBook = createBookCard(library[i]);
        libraryContainer.append(newBook);
        newBook.style.gridColumn = `${col}`;
        newBook.style.gridRow = `${row}`;
        col++;
        if (col > 4) {
            col = 1;
            row++;
        }
    }
}

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', function() {
    document.getElementById('myForm').style.display = 'block';
});

const submitNewBook = document.getElementById('btn-create');
submitNewBook.addEventListener('click', function() {
    let newestBookInputs = document.getElementById('form-container').elements;
    let cleanedInputs = [];
    
    for (let i = 0; i < newestBookInputs.length; i++) {
        if (newestBookInputs[i].nodeName == 'INPUT' || newestBookInputs[i].nodeName === 'SELECT') {
            cleanedInputs.push(newestBookInputs[i].value)
        }
    }

    const readyNewBook = new Book(cleanedInputs[0], cleanedInputs[1], cleanedInputs[2], cleanedInputs[3]);
    addBookToLibrary(readyNewBook);
    updateLibrary(myLibrary);
});


function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}