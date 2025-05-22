let currentUser = JSON.parse(localStorage.getItem("isLoggedIn"));
// Nếu currentUser là string, ta chuyển thành object dạng { currentUserName: ... }
if (typeof currentUser === "string") {
  currentUser = { currentUserName: currentUser };
}
let currentUserName = JSON.parse(localStorage.getItem("listUser"));

if (!currentUser) {
  alert("Please log in to use this page!");
  window.location.href = "../login/login.html";
} else {
  document.querySelector(".user-name").textContent =
    currentUser.currentUserName;
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "../login/login.html";
}

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

let moveToCreate = document.querySelector(".create-btn");
moveToCreate.addEventListener("click", () => {
  window.location.href = "../create/create.html";
});

let libraryBtn = document.querySelector(".library-btn");
libraryBtn.style.cssText = `
    background-color: rgba(163, 29, 29, 0.2);
    color: rgb(216, 64, 64);
    border-radius: 20px;
`;

let moveToLibrary = document.querySelector(".library-btn");
moveToLibrary.addEventListener("click", () => {
  window.location.href = "../library/library.html";
});

let moveToDashBoard = document.querySelector(".dashboard-btn");
moveToDashBoard.addEventListener("click", () => {
  window.location.href = "../dashboard/db.html";
});

document.addEventListener("DOMContentLoaded", function () {
  let bookDetail = document.querySelector(".book-detail");
  let bookData = JSON.parse(localStorage.getItem("bookData")) || [];
  let selectedBookIndex = parseInt(localStorage.getItem("selectedBookIndex"));

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

  if (bookDetail && selectedBookIndex !== null && bookData[selectedBookIndex]) {
    let selectedBook = bookData[selectedBookIndex];

    // Tạo HTML cho phần đầu trang (chứa nút X và Edit)
    let bookHeaderHTML = `<div class="book-header">
              <button class="back-button" onclick="window.location.href = 'library.html'">X</button>`;
    if (currentUser && currentUser.currentUserName === selectedBook.createdBy) {
      bookHeaderHTML += `<button class="edit-button">Edit post</button>`;
    }
    bookHeaderHTML += `</div>`;

    bookDetail.innerHTML = `
          <div class="book-details">
              ${bookHeaderHTML}
              <img src="${selectedBook.bookImage}" alt="Cover of ${
      selectedBook.title
    }" />
              <div class="details-info">
                  <h2>${selectedBook.title}</h2>
                  <p><strong>Author:</strong> ${
                    selectedBook.author || "Unknown"
                  }</p>
                  <p><strong>Genres:</strong> ${
                    selectedBook.genres
                      ? selectedBook.genres.join(", ")
                      : "Unknown"
                  }</p>
                  <p><strong>Status:</strong> <span class="status">${
                    selectedBook.status || "Unknown"
                  }</span></p>
                  <p><strong>Rating:</strong> <span class="rating">${
                    selectedBook.rating
                      ? renderStars(parseInt(selectedBook.rating))
                      : "Not yet"
                  }</span></p>
                  <p><strong>Review:</strong> ${
                    selectedBook.review || "No review yet"
                  }</p>
                  <p><strong>Created by:</strong> ${
                    selectedBook.createdBy || "Unknown"
                  }</p>
              </div>
          </div>
          <div class="comment">
            <div class="head">
              <h2>Comments</h2>
            </div>
            <div class="comment-box">
              <i class='bx bx-user-circle'></i>
              <div class="new-comment-box">
                <div class="new-comment">
                  <textarea placeholder="Add a comment..."></textarea>
                  <div class="comment-button-box"><button class="comment-button">Comment</button></div>
                </div>

                <div class="comments-container">
                  <ul class="comments-list"></ul>
                </div>
              </div>
            </div>
          </div>
      `;

    // Thêm sự kiện cho nút Edit Post
    let editButton = document.querySelector(".edit-button");
    if (editButton) {
      editButton.addEventListener("click", () => {
        // Tạo form chỉnh sửa và hiển thị nó
        let editForm = document.createElement("form");
        editForm.className = "edit-form";
        editForm.innerHTML = `
                  <h2>Edit Book</h2>
                  <label for="edit-image">Image URL:</label>
                  <input type="text" id="edit-image" name="image" value="${
                    selectedBook.bookImage || ""
                  }">
                  <label for="edit-title">Title:</label>
                  <input type="text" id="edit-title" name="title" value="${
                    selectedBook.title
                  }">
                  <label for="edit-author">Author:</label>
                  <input type="text" id="edit-author" name="author" value="${
                    selectedBook.author || ""
                  }">
                  <label for="edit-genres">Genres:</label>
                  <input type="text" id="edit-genres" name="genres" value="${
                    selectedBook.genres ? selectedBook.genres.join(", ") : ""
                  }">
                  <label for="edit-status">Status:</label>
                  <input type="text" id="edit-status" name="status" value="${
                    selectedBook.status || ""
                  }">
                  <label for="edit-rating">Rating:</label>
                  <input type="text" id="edit-rating" name="rating" value="${
                    selectedBook.rating || ""
                  }">
                  <label for="edit-review">Review:</label>
                  <textarea id="edit-review" name="review">${
                    selectedBook.review || ""
                  }</textarea>
                  <button type="button" class="save-button">Save Changes</button>
                  <button type="button" class="cancel-button">Cancel</button>
              `;

        // Thay thế nội dung book-detail bằng form
        bookDetail.innerHTML = "";
        bookDetail.appendChild(editForm);

        // Thêm sự kiện cho nút Save Changes
        let saveButton = bookDetail.querySelector(".save-button");
        saveButton.addEventListener("click", () => {
          // Lấy dữ liệu đã chỉnh sửa
          selectedBook.title = document.getElementById("edit-title").value;
          selectedBook.author = document.getElementById("edit-author").value;
          selectedBook.genres = document
            .getElementById("edit-genres")
            .value.split(",")
            .map((item) => item.trim());
          selectedBook.status = document.getElementById("edit-status").value;
          selectedBook.rating = document.getElementById("edit-rating").value;
          selectedBook.review = document.getElementById("edit-review").value;
          selectedBook.bookImage = document.getElementById("edit-image").value;

          // Lưu vào localStorage
          bookData[selectedBookIndex] = selectedBook;
          localStorage.setItem("bookData", JSON.stringify(bookData));

          // Sau khi lưu, hiển thị lại chi tiết sách
          window.location.href = "details.html";
        });

        // Thêm sự kiện cho nút Cancel
        let cancelButton = bookDetail.querySelector(".cancel-button");
        cancelButton.addEventListener("click", () => {
          // Xóa form và hiển thị lại thông tin sách ban đầu
          window.location.href = "details.html";
        });
      });
    }

    // Thêm sự kiện cho nút "Comment"
    let commentButton = document.querySelector(".comment-button");
    if (commentButton) {
      let commentInput = document.querySelector("textarea");
      commentButton.addEventListener("click", () => {
        let commentText = commentInput.value.trim();
        if (commentText) {
          // Lấy thông tin người dùng để hiển thị cùng với bình luận
          let commentAuthor = currentUser
            ? currentUser.currentUserName
            : "Anonymous";

          // Thêm bình luận mới vào giao diện người dùng
          let commentsList = document.querySelector(".comments-list");
          let newCommentItem = document.createElement("li");
          newCommentItem.innerHTML = `<div><span class="comment-author"><strong>${commentAuthor}</strong>: <span class="comment-text">${commentText}</span></span></div>`;

          // Nếu là người tạo bài đăng, thêm nút xóa
          if (
            currentUser &&
            currentUser.currentUserName === selectedBook.createdBy
          ) {
            addDeleteButton(newCommentItem);
          }
          commentsList.appendChild(newCommentItem);

          // Xóa nội dung của textarea sau khi thêm bình luận
          commentInput.value = "";

          // Cập nhật lại trang để hiển thị bình luận mới
          let existingComments =
            JSON.parse(
              localStorage.getItem(`comments_book_${selectedBookIndex}`)
            ) || [];
          existingComments.push({
            author: commentAuthor,
            text: commentText,
          });
          localStorage.setItem(
            `comments_book_${selectedBookIndex}`,
            JSON.stringify(existingComments)
          );
        } else {
          alert("Please enter a comment before submitting.");
        }
      });
    }

    // Hiển thị các bình luận đã lưu
    let savedComments =
      JSON.parse(localStorage.getItem(`comments_book_${selectedBookIndex}`)) ||
      [];
    let commentsList = document.querySelector(".comments-list");
    commentsList.innerHTML = "";

    // Hàm thêm nút Delete
    let addDeleteButton = (commentItem, commentAuthor, commentText) => {
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "🗑️";
      deleteButton.classList.add("delete-comment-button");
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (confirm("Are you sure you want to DELETE the comment?")) {
          commentItem.remove();

          let updatedComments =
            JSON.parse(
              localStorage.getItem(`comments_book_${selectedBookIndex}`)
            ) || [];
          // Lọc các bình luận không khớp với cả tác giả và nội dung
          updatedComments = updatedComments.filter(
            (c) => !(c.author === commentAuthor && c.text === commentText)
          );
          localStorage.setItem(
            `comments_book_${selectedBookIndex}`,
            JSON.stringify(updatedComments)
          );
        }
      });
      commentItem.appendChild(deleteButton);
    };

    savedComments.forEach((comment) => {
      let commentItem = document.createElement("li");

      let commentText = document.createElement("div");
      commentText.innerHTML = `<span class="comment-author"><strong>${comment.author}</strong>: <span class="comment-text">${comment.text}</span>`;
      commentItem.appendChild(commentText);

      if (currentUser && currentUser.currentUserName === comment.author) {
        addDeleteButton(commentItem, comment.author, comment.text);
      }
      commentsList.appendChild(commentItem);
    });
  } else if (bookDetail) {
    bookDetail.innerHTML = "<p>Nothing.</p>";
  } else {
    console.error("Not found!");
  }
});
