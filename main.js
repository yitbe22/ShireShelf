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

books.forEach((book) => {
   book.style.background = colors[Math.floor(Math.random() * colors.length)];
})

addBtn.addEventListener("click", ()=>{
    bookModal.hidden = false;
});



booksRow.innerHTML += `<div class="book">
                <p class="title">${titleInput.value}</p>
                <div class="bar"></div>
                <h6 class="author">${authorInput.value}</h6>
            </div>`;


