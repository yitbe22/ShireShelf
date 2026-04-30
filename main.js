const books = document.querySelectorAll(".book");
const booksRow = document.getElementById("books-row");
const addBtn = document.getElementById("addBtn");
const bookModal = document.querySelector(".book-modal");
const bookForm = document.getElementById("book-form");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

const colors = [
  "#1b2a41",
  "#3d2c5a",
  "#1f4d3a",
  "#1e5f6f",
  "#6b2d2d",
  "#3c3c3c",
  "#b08d57",
  "#2a2a72",
  "#4b5d6b",
  "#aab7c4"
];

const myLibrary = [];
let editingBookId = null;

class Book{
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    renderBooks();
}



function renderBooks(){
     booksRow.innerHTML = "";
     
    myLibrary.forEach((book) => {
      const randColor =  colors[Math.floor(Math.random() * colors.length)];
      const bookContainer = document.createElement("div");
      bookContainer.classList.add("book");

      bookContainer.dataset.id = book.id;
      bookContainer.style.background = randColor;

    bookContainer.innerHTML = `
      <p class="title">${book.title}</p>
      <div class="bar"></div>
      <h6 class="author">${book.author}</h6>
    `;

    booksRow.appendChild(bookContainer);
    bookContainer.addEventListener("click", openForm);

});

}

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (editingBookId) {
    // Edit existing book
    const book = myLibrary.find(b => b.id === editingBookId);
    if (book) {
      book.title = titleInput.value;
      book.author = authorInput.value;
      book.pages = pagesInput.value;
      book.read = readInput.checked;
    }
    editingBookId = null;
  } else {
    // Add new book
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.checked
    );
  }
    bookModal.hidden = false;
    bookForm.reset();

    renderBooks();
})

addBtn.addEventListener("click", ()=> {
     editingBookId = null;
     bookForm.reset();
     bookModal.hidden = false;
});

function openForm(e){
      
      const bookId = e.currentTarget.dataset.id;
      const book = myLibrary.find(b => b.id === bookId);
      if(book){
           editingBookId = bookId;
           titleInput.value = book.title;
           authorInput.value = book.author;
           pagesInput.value = book.pages;
           readInput.checked = book.read;
           bookModal.hidden = false;
      }
     

}














