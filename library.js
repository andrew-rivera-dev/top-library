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
addBookToLibrary(hp);
pushNewBooks(myLibrary);

function createBookCard(book, library) {
    const d = document.createElement('div');
    d.className = 'book';

    const title = document.createElement('h3');
    title.innerHTML =  book.title; 
    d.appendChild(title);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-close"></i>';
    deleteButton.classList.add('delete-button');
    d.appendChild(deleteButton);

    //delete button event listener
    deleteButton.addEventListener('click', function() {
        const parent = deleteButton.parentElement;
        const grandparent = parent.parentElement;
        grandparent.removeChild(parent);

        library.splice(parent.dataset.index, 1);
        
    })    

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
        if (!children[i].classList.contains('delete-button')) children[i].classList.add('book-info');
    }

    return d;
}

function pushNewBooks(library) {
    const libraryContainer = document.getElementById('library-container');
    // const children = libraryContainer.children;

    for (let i = 0; i < library.length; i++) {
        // if (children[i].dataset.index === library.indexOf(library[i])) return 'hi';

        let newBook = createBookCard(library[i], library);
        libraryContainer.append(newBook);
        newBook.style.gridAutoColumns = 'auto';
        newBook.style.gridAutoRows = 'auto';
    }
}

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', function() {
    const d = document.getElementById('myForm');
    d.style.display = 'block';

    const children = document.body.children;

    for (let i = 0; i < children.length; i++) {
        if (children[i].id !== 'myForm') children[i].classList.add('blur-filter');
    }
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
    pushNewBooks(myLibrary);
});

function closeForm() {
    document.getElementById('myForm').style.display = 'none';

    const children = document.body.children;

    for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains('blur-filter')) children[i].classList.remove('blur-filter');
    }
}