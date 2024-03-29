import "../../../blocks/header/header";
import "../../../blocks/footer/footer";
import "../../../blocks/comment/comment";
import "../../../blocks/card-room-book/card-room-book";

import { setCounters } from "../../../blocks/dropdown-guests/dropdown-guests";
import { updateDatePickerDropdowns } from "../../../blocks/date-range-picker/date-range-picker";
import { updateCalendarDates } from "../../../blocks/range-calendar/range-calendar";

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

loadFilterDataFromLocalStorage();

function loadFilterDataFromLocalStorage() {
  const roomSearchData = JSON.parse(
    localStorage.getItem("room-search-form-data")
  );
  const dateRangePicker = document.querySelector(".date-range-picker");
  const calendar = dateRangePicker.querySelector(".range-calendar");
  const guestsDropdown = document.querySelector(".dropdown-guests");

  updateCalendarDates(
    calendar,
    roomSearchData.dates.from,
    roomSearchData.dates.to
  );
  updateDatePickerDropdowns(dateRangePicker);

  setCounters(guestsDropdown, roomSearchData.guests);
}

initCommentsSection();

function initCommentsSection() {
  const commentElem = document.querySelector(".room-info__comments");
  const comments = Array.from(commentElem.querySelectorAll(".comment"));
  const commentsCountTotal = comments.length;

  if (commentsCountTotal == 0) {
    const lastShownCommentIndex = -1;

    commentElem.dataset.commentsCountTotal = commentsCountTotal;
    commentElem.dataset.lastShownCommentIndex = lastShownCommentIndex;

    updateCommentsCountLabel();

    return;
  } else if (commentsCountTotal < 2) {
    comments[0].classList.add("comment_show");

    const lastShownCommentIndex = 0;

    commentElem.dataset.commentsCountTotal = commentsCountTotal;
    commentElem.dataset.lastShownCommentIndex = lastShownCommentIndex;

    updateCommentsCountLabel();

    return;
  }

  comments[0].classList.add("comment_show");
  comments[1].classList.add("comment_show");

  const lastShownCommentIndex = 1;

  commentElem.dataset.commentsCountTotal = commentsCountTotal;
  commentElem.dataset.lastShownCommentIndex = lastShownCommentIndex;

  updateCommentsCountLabel();
}

setMoreCommentBtnHandlers();

function setMoreCommentBtnHandlers() {
  const moreCommentBtn = document.querySelector(
    ".room-info__comments-more-btn"
  );

  moreCommentBtn.addEventListener("click", showMoreComments);
}

function showMoreComments() {
  const commentElem = document.querySelector(".room-info__comments");
  const comments = Array.from(commentElem.querySelectorAll(".comment"));
  const commentsCountTotal = parseInt(commentElem.dataset.commentsCountTotal);
  const lastShownCommentIndex = parseInt(
    commentElem.dataset.lastShownCommentIndex
  );

  const leftComments = commentsCountTotal - lastShownCommentIndex - 1;

  if (leftComments < 1) {
    return;
  } else if (leftComments < 2) {
    comments[lastShownCommentIndex + 1].classList.add("comment_show");
    comments[1].classList.add("comment_show");

    commentElem.dataset.lastShownCommentIndex = lastShownCommentIndex + 1;

    return;
  }

  comments[lastShownCommentIndex + 1].classList.add("comment_show");
  comments[lastShownCommentIndex + 2].classList.add("comment_show");

  commentElem.dataset.lastShownCommentIndex = lastShownCommentIndex + 2;
}
