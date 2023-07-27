import "../date-range-picker/date-range-picker";
import "../dropdown-guests/dropdown-guests";
import "../button/button";
import { getCounters } from "../dropdown-guests/dropdown-guests";

const searchCards = document.querySelectorAll(".card-room-search");

function getDates(cardForm) {
  const datePicker = cardForm.querySelector(".date-range-picker");
  const dateFrom = datePicker.dataset.dateFrom;
  const dateTo = datePicker.dataset.dateTo;
  return { from: dateFrom, to: dateTo };
}

function isFormDataValid(cardForm) {
  const dropdown = cardForm.querySelector(".dropdown");
  const dates = getDates(cardForm);
  const guests = getCounters(dropdown);
  const adultGuests = parseInt(guests.get("adults"));

  return dates.from && dates.to && adultGuests ? true : false;
}

function handleSubmit(event) {
  event.preventDefault();
  const cardForm = event.currentTarget;
  if (isFormDataValid(cardForm)) {
    window.location.assign("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }
}

searchCards.forEach((card) => {
  const cardForm = card.querySelector(".card-room-search__form");
  cardForm.addEventListener("submit", handleSubmit);
});
