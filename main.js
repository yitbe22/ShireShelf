const books = document.querySelectorAll(".book");
const booksRow = document.getElementById("books-row");





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

