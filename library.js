let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibraryArray(book) {
    myLibrary.push(book);
}

function createBookCard(book) {
    const d = document.createElement('div');
    d.className = 'book';
    d.style.gridAutoColumns = 'auto';
    d.style.gridAutoRows = 'auto';

    const title = document.createElement('h3');
    title.innerHTML =  book.title; 
    d.appendChild(title);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-close"></i>';
    deleteButton.classList.add('delete-button');
    deleteButton.title = 'Delete book';
    d.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
        const parent = deleteButton.parentElement;
        const grandparent = parent.parentElement;
        grandparent.removeChild(parent);
    })    

    const author = document.createElement('span');
    author.innerHTML = 'Author: ' + book.author; 
    d.appendChild(author);

    const pages = document.createElement('span');
    pages.innerHTML = 'Number of pages: ' + book.pages; 
    d.appendChild(pages);

    const read = document.createElement('span');
    read.innerHTML = 'Read Status: ' + book.read; 
    read.classList.add('read-status');
    d.appendChild(read);

    const readStatusLabel = document.createElement('label');
    readStatusLabel.classList.add('switch');
    readStatusLabel.title = 'Toggle read status';
    d.appendChild(readStatusLabel);

    const readStatusInput = document.createElement('input');
    readStatusInput.type = 'checkbox';
    readStatusLabel.appendChild(readStatusInput);
    
    const readStatusSlider = document.createElement('span');
    readStatusSlider.classList.add('slider-round');
    readStatusLabel.appendChild(readStatusSlider);

    if (book.read === 'Complete') readStatusInput.checked = true;

    readStatusInput.addEventListener('change', function() {
        if (this.checked) {
            book.read = 'Complete';
            read.innerHTML = read.innerHTML.replace('Incomplete', 'Complete');
        } else {
            book.read = 'Incomplete';
            read.innerHTML = read.innerHTML.replace('Complete', 'Incomplete');
        }
    });

    const children = Array.from(d.children);

    for (let i = 0; i < children.length; i++) {
        if (!children[i].classList.contains('delete-button') &&
            !children[i].classList.contains('switch')) children[i].classList.add('book-info');
    }

    return d;
}

function addNewBookCard(library) {
    const libraryContainer = document.getElementById('library-container');

    let newBook = createBookCard(library[library.length - 1]);
    libraryContainer.append(newBook);
}

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', function() {
    const d = document.getElementById('myForm');
    d.style.display = 'block';

    document.getElementById('form-title').value = '';
    document.getElementById('form-author').value = '';
    document.getElementById('form-pages').value = '';

    const children = document.body.children;

    for (let i = 0; i < children.length; i++) {
        if (children[i].id !== 'myForm') children[i].classList.add('blur-filter');
    }
});

const submitNewBook = document.getElementById('btn-create');
submitNewBook.addEventListener('click', function() {
    let newestBookInputs = document.getElementsByClassName('form-info');
    let cleanedInputs = [];
    
    for (let i = 0; i < newestBookInputs.length; i++) {
        if (newestBookInputs[i].nodeName == 'INPUT' || newestBookInputs[i].nodeName === 'SELECT') {
            cleanedInputs.push(newestBookInputs[i].value)
        }
    }

    if (cleanedInputs.some(x => x === '')) return;

    const readyNewBook = new Book(cleanedInputs[0], cleanedInputs[1], cleanedInputs[2], cleanedInputs[3]);
    console.log(newestBookInputs);
    addBookToLibraryArray(readyNewBook);
    addNewBookCard(myLibrary);
    closeForm();
});

function closeForm() {
    document.getElementById('myForm').style.display = 'none';

    const children = document.body.children;

    for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains('blur-filter')) children[i].classList.remove('blur-filter');
    }
}