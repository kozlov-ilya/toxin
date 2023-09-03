import "../../blocks/header/header";
import "../../blocks/footer/footer";
import "../../blocks/comment/comment";
import "../../blocks/card-room-book/card-room-book";

const page = document.querySelector(".page");
const header = document.querySelector(".header");
const burgerButton = header.querySelector(".burger-button");

burgerButton.addEventListener("click", handleBurgerButtonClick);

function handleBurgerButtonClick(event) {
  /* Prevent page scrolling */
  page.classList.toggle("page_scroll_lock");
}

updateBookCard();
updateRoomGallery();

window.addEventListener("resize", (event) => {
  updateBookCard();
  updateRoomGallery();
});

function updateBookCard() {
  const match = window.matchMedia("(max-width: 1023px)");
  const bookCard = document.querySelector(".card-room-book");

  if (match.matches) {
    makeBookCardResponsive(bookCard);
  } else {
    makeBookCardStatic(bookCard);
  }

  function makeBookCardResponsive(bookCard) {
    bookCard.classList.add("card-room-book_size_responsive");
    bookCard
      .querySelector(".dropdown-guests")
      .classList.add("dropdown-guests_size_responsive");
    bookCard
      .querySelector(".card-room-book__book-btn")
      .classList.add("button_size_expanded");
    bookCard
      .querySelector(".date-range-picker")
      .classList.add("date-range-picker_responsive");
  }

  function makeBookCardStatic(bookCard) {
    bookCard.classList.remove("card-room-book_size_responsive");
    bookCard
      .querySelector(".dropdown-guests")
      .classList.remove("dropdown-guests_size_responsive");
    bookCard
      .querySelector(".card-room-book__book-btn")
      .classList.remove("button_size_expanded");
    bookCard
      .querySelector(".date-range-picker")
      .classList.remove("date-range-picker_responsive");
  }
}

function updateRoomGallery() {
  const match = window.matchMedia("(max-width: 959px)");
  const roomGalleryElem = document.querySelector(".room-gallery");

  if (match.matches) {
    showRoomGallerySlider();
  } else {
    showRoomGalleryTable();
  }

  function showRoomGalleryTable() {
    roomGalleryElem
      .querySelector(".room-gallery-table")
      .classList.add("room-gallery-table_show");

    roomGalleryElem
      .querySelector(".room-gallery-slider")
      .classList.remove("room-gallery-slider_show");
  }

  function showRoomGallerySlider() {
    roomGalleryElem
      .querySelector(".room-gallery-slider")
      .classList.add("room-gallery-slider_show");

    roomGalleryElem
      .querySelector(".room-gallery-table")
      .classList.remove("room-gallery-table_show");
  }
}

updateCommentsCountLabel();

function updateCommentsCountLabel() {
  const commentWordForms = ["отзыв", "отзыва", "отзывов"];

  function getProperWordForm(value, wordForms) {
    value = Math.abs(value) % 100;
    const lastDigit = value % 10;
    if (value > 10 && value < 20) return wordForms[2];
    if (lastDigit > 1 && lastDigit < 5) return wordForms[1];
    if (lastDigit == 1) return wordForms[0];
    return wordForms[2];
  }

  const commentElem = document.querySelector(".room-info__comments");
  const countLabel = commentElem.querySelector(
    ".room-info__comments-count-label"
  );
  const comments = commentElem.querySelectorAll(".comment");

  countLabel.textContent = `${comments.length} ${getProperWordForm(
    comments.length,
    commentWordForms
  )}`;
}
