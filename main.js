const sound = document.getElementById("bgSound");
const soundBtn = document.getElementById("soundBtn");
const books = document.querySelectorAll(".book");
const booksRow = document.getElementById("books-row");
const addBtn = document.getElementById("addBtn");
const bookModal = document.querySelector(".book-modal");
const bookForm = document.getElementById("book-form");
const modalOverlay = document.querySelector(".modal-overlay");


const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

const colors = [
  "#2e3d4f", 
  "#4a3a5c", 
  "#304d3f", 
  "#2f5a62", 
  "#5e3535", 
  "#4a4640",
  "#8a7252", 
  "#353560", 
  "#4a5660", 
  "#8e9ba4", 
];

function applyBookStyle(book, color) {
  book.style.background = `linear-gradient(to bottom, ${color}, ${darken(color, 35)})`;
}

function darken(color, amount = 30) {
  return "#" + color.replace("#", "")
    .match(/.{2}/g)
    .map(c => {
      const v = Math.max(0, parseInt(c, 16) - amount);
      return v.toString(16).padStart(2, "0");
    })
    .join("");
}

let isPlaying = false;

soundBtn.addEventListener("click", () => {
  if (!isPlaying) {
    sound.play();
    
    soundBtn.innerHTML = `<i class="fa-brands fa-itunes-note"></i>`;
  } else {
    sound.pause();
    soundBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  }

  isPlaying = !isPlaying;
});


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

const myLibrary = [
   new Book("The Fellowship of the Ring", "J.R.R.", 423, true),
   new Book("The Hobbit", "J.R.R.", 310, false)
];



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
      applyBookStyle(bookContainer, randColor);

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
    modalOverlay.classList.remove("active");
    bookForm.reset();

    renderBooks();
})

addBtn.addEventListener("click", ()=> {
     editingBookId = null;
     bookForm.reset();
     modalOverlay.classList.add("active");
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
           modalOverlay.classList.add("active");
      }  

}

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
     modalOverlay.classList.remove("active");
  }
});

renderBooks();














