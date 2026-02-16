// wait until page finishes loading
document.addEventListener('DOMContentLoaded', () => {

  const myLibrary = [];

  // book constructor
  function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title || 'Untitled';
    this.author = author || 'Unknown';
    this.pages = Number.isFinite(pages) ? pages : 0;
    this.read = !!read;
  }

  // method to toggle read status
  Book.prototype.toggleRead = function() {
  this.read = !this.read;
  };


  // add book function
  function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
  }

  // create and display book cards
  function renderLibraryCards() {
    const container = document.getElementById('libraryContainer');
    container.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.style.border = '1px solid black';
        card.style.padding = '10px';
        card.style.margin = '10px';

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button class="delete-btn" data-id="${book.id}">Delete</button>
            <button class="toggle-read-btn" data-id="${book.id}" style="margin-top: 5px;">Toggle Read Status</button>
        `;

        container.appendChild(card);

        // add delete button functionality
        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteBook(book.id);
        });

        // add toggle read status functionality
        const toggleBtn = card.querySelector('.toggle-read-btn');
        toggleBtn.addEventListener('click', () => {
            book.toggleRead();      // call the prototype method
            renderLibraryCards();   // update the UI
        });
    });
  }

    //delete book function
    function deleteBook(id) {
        // Remove the book with the matching id
        const index = myLibrary.findIndex(book => book.id === id);
        if (index !== -1) {
            myLibrary.splice(index, 1); // remove the book from the array
            renderLibraryCards();        // re-render the cards
        };
    };

  // sample books to start
  addBookToLibrary('The Bible', 'God', 1000, true);
  addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);
  addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
  addBookToLibrary('1984', 'George Orwell', 328, false);
  addBookToLibrary('Pride and Prejudice', 'Jane Austen', 432, true);

  // initial render of book cards
  renderLibraryCards();


  // gather button and form elements
  const newBookBtn = document.getElementById('newBookBtn');
  const bookForm = document.getElementById('bookForm');

  // display form when button is clicked
  newBookBtn.addEventListener('click', () => {
    bookForm.style.display = 'block';
  });

  // form submission
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = Number(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    // re-render cards to include new book
    renderLibraryCards();

    bookForm.reset();
    bookForm.style.display = 'none';
  });
});
