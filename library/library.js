let currentUser = JSON.parse(localStorage.getItem("isLoggedIn"));
let currentUserName = JSON.parse(localStorage.getItem("listUser"));

if (!currentUser) {
  alert("Please log in to use this page!");
  window.location.href = "../login/login.html";
} else {
  document.querySelector(".user-name").textContent = currentUser.currentUserName;
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "../login/login.html";
}


let bookData = JSON.parse(localStorage.getItem("bookData")) || [];
let bookList = document.querySelector(".book-list");

function renderStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "★";
  }

  for (let i = 0; i < 5 - rating; i++) {
    stars += "☆";
  }

  return stars;
}

// Hiển thị từng cuốn sách
bookData.forEach((book, index) => {
  let bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
      <img src="${book.bookImage}" alt="Book cover" />
      <h3>${book.title}</h3>
      <p>Rating: <span class="rating"> ${
        book.rating ? renderStars(parseInt(book.rating)) : "Not yet"
      } </span></p>
      <button class="status">${book.status || "Unknown"}</button>
    `;

    bookCard.addEventListener("click", () => {
      // Lưu index của cuốn sách đã chọn vào localStorage
      localStorage.setItem("selectedBookIndex", index);
      // Chuyển hướng đến trang chi tiết
      window.location.href = "/SPCK/library/details.html";
  });

  bookList.appendChild(bookCard);
});

// 1. Giữ theme đã lưu và đổi logo theo theme
window.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme") || "light";
  let logo = document.querySelector(".logo");

  document.body.classList.add(`${savedTheme}-mode`);

  if (savedTheme === "dark") {
    logo.src = "../image/logo-dark.png";
  } else {
    logo.src = "../image/logo.png";
  }
});

// 2. Bấm nút thì đổi theme, đổi logo, lưu lại
let change = document.querySelector(".light-dark-mode");

change.addEventListener("click", () => {
  let isDark = document.body.classList.contains("dark-mode");

  // Xóa cả 2 class trước khi thêm lại
  document.body.classList.remove("dark-mode", "light-mode");

  let newTheme = isDark ? "light" : "dark";
  document.body.classList.add(`${newTheme}-mode`);
  localStorage.setItem("theme", newTheme);

  // Đổi logo
  let logo = document.querySelector(".logo");
  logo.src =
    newTheme === "dark" ? "../image/logo-dark.png" : "../image/logo.png";
});

let libraryBtn = document.querySelector(".library-btn");
libraryBtn.style.cssText = `
    background-color: rgba(163, 29, 29, 0.2);
    color: rgb(216, 64, 64);
    border-radius: 20px;
`;

let moveToCreate = document.querySelector(".create-btn");
moveToCreate.addEventListener("click", () => {
  window.location.href = "../create/create.html";
});

let moveToDashBoard = document.querySelector(".dashboard-btn");
moveToDashBoard.addEventListener("click", () => {
  window.location.href = "../dashboard/db.html";
})
