let currentUser = JSON.parse(localStorage.getItem("isLoggedIn"));
let listUser = JSON.parse(localStorage.getItem("listUser"));

if (!currentUser) {
  alert("Please log in to use this page!");
  window.location.href = "/SPCK/login/login.html";
} else {
  document.querySelector(".user-name").textContent =
    currentUser.currentUserName;
}

let createBtn = document.querySelector(".create-btn");
createBtn.style.backgroundColor = "rgb(163, 29, 29, 0.2)";
createBtn.style.color = "rgb(216, 64, 64)";
createBtn.style.borderRadius = "20px";

let moveToDash = document.querySelector(".dashboard-btn");
moveToDash.addEventListener("click", () => {
  window.location.href = "/SPCK/dashboard/db.html";
});

let moveToLibrary = document.querySelector(".library-btn");
moveToLibrary.addEventListener("click", () => {
  window.location.href = "/SPCK/library/library.html";
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/SPCK/login/login.html";
}

let bookImage = document.getElementById("bookImage");
let title = document.getElementById("title");
let author = document.getElementById("author");

let genreAction = document.getElementById("genre-action");
let genreAdventure = document.getElementById("genre-adventure");
let genreFantasty = document.getElementById("genre-fantasty");
let genreRomance = document.getElementById("genre-romance");
let genreThriller = document.getElementById("genre-thriller");
let genreSciFic = document.getElementById("genre-sci-fic");

let genreInputs = [
  genreAction,
  genreAdventure,
  genreFantasty,
  genreRomance,
  genreThriller,
  genreSciFic,
];

let status = document.getElementById("status");

let rating = document.getElementById("rating");
let review = document.getElementById("review");
let bookCard = document.querySelector(".book-card");
let form = document.querySelector("form");
let submitButton = document.querySelector("button[type='submit']");
let clearButton = document.querySelector("button[type='reset']");

function updateBookCardLive() {
  let genres = [];
  genreInputs.forEach((input) => {
    if (input.checked) {
      genres.push(input.value);
    }
  });

  bookCard.innerHTML = `
    <img src="${bookImage.value}" alt="Book cover" />
    <h3>${title.value || "No title"}</h3>
    <p>Author: ${author.value || "Unknown"}</p>
    <p>Genres: ${genres.join(", ")}</p>
    <p>Status: ${status.value || "Not selected"}</p>
  `;
}

// Gọi lại hàm mỗi khi người dùng nhập
[bookImage, title, author, status].forEach((el) =>
  el.addEventListener("input", updateBookCardLive)
);
genreInputs.forEach((input) =>
  input.addEventListener("change", updateBookCardLive)
);

// Gọi một lần khi load trang
updateBookCardLive();

let bookData = JSON.parse(localStorage.getItem("bookData")) || [];

submitButton.addEventListener("click", function (e) {
  e.preventDefault(); // Ngăn form bị gửi đi mặc định

  // Lấy danh sách thể loại đã chọn
  let genres = [];
  genreInputs.forEach((input) => {
    if (input.checked) {
      genres.push(input.value);
    }
  });

  // Tạo sách mới
  let newBook = {
    bookImage: bookImage.value,
    title: title.value.trim(),
    author: author.value.trim(),
    genres: genres,
    status: status.value,
    rating: rating.value,
    review: review.value,
    createdBy: currentUser.currentUserName,
  };

  // Tìm đúng người dùng hiện tại trong listUser
  let userInfo = listUser.find(
    (user) => user.username === currentUser.currentUserName
  );

  // Nếu tìm thấy thì xử lý
  if (userInfo) {
    // Kiểm tra trùng sách trong danh sách của user
    let isExistInUserList = userInfo.list_post.some(
      (book) =>
        book.title === newBook.title &&
        book.author === newBook.author
    );

    if (isExistInUserList) {
      let confirmSave = confirm(
        "You have been saved this. Do you want to save it AGAIN?"
      );
      if (!confirmSave) return;
    }

    // Thêm sách vào danh sách của user
    userInfo.list_post.push(newBook);

    // Lưu lại listUser
    localStorage.setItem("listUser", JSON.stringify(listUser));
    alert("Book has been saved in your account!");

    // (Tuỳ chọn) cũng lưu vào bookData chung
    let isExistInBookData = bookData.some(
      (book) =>
        book.title.toLowerCase() === newBook.title.toLowerCase() &&
        book.author.toLowerCase() === newBook.author.toLowerCase()
    );

    if (!isExistInBookData) {
      bookData.push(newBook);
      localStorage.setItem("bookData", JSON.stringify(bookData));
    }

    // Reset form và cập nhật lại preview
    form.reset();
    updateBookCardLive();
  } else {
    alert("Cannot find your account. Please log in again.");
  }
});

// Giữ theme đã lưu và đổi logo theo theme
window.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme") || "light";
  let logo = document.querySelector(".logo");

  document.body.classList.add(`${savedTheme}-mode`);

  if (savedTheme === "dark") {
    logo.src = "/SPCK/image/logo-dark.png";
  } else {
    logo.src = "/SPCK/image/logo.png";
  }
});

// Bấm nút thì đổi theme, đổi logo, lưu lại
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
    newTheme === "dark" ? "/SPCK/image/logo-dark.png" : "/SPCK/image/logo.png";
});
