import moment from "moment";

import "../date-range-picker/date-range-picker";
import "../dropdown-guests/dropdown-guests";
import "../button/button";

import { getCounters } from "../dropdown-guests/dropdown-guests";

const searchCard = document.querySelector(".card-room-search");

addSearchCardHandlers(searchCard);

function addSearchCardHandlers(searchCard) {
  searchCard.addEventListener("click", hideErrors);

  function hideErrors(event) {
    const fields = searchCard.querySelectorAll(".field");

    fields.forEach((field) => {
      field.classList.remove("field_state_error");
    });
  }
}

export function validateForm(form) {
  const errors = getErrors(form);

  if (!(errors.dates || errors.guests)) {
    return true;
  }

  showErrors(form, errors);

  return false;
}

function showErrors(form, errors) {
  if (errors.dates) {
    const dateRangePicker = form.querySelector(".date-range-picker");
    const fields = dateRangePicker.querySelectorAll(".field");

    fields.forEach((field) => {
      field.classList.add("field_state_error");
    });
  }

  if (errors.guests) {
    const guestsDropdown = form.querySelector(".dropdown-guests");
    const fields = guestsDropdown.querySelectorAll(".field");

    fields.forEach((field) => {
      field.classList.add("field_state_error");
    });
  }
}

function getErrors(form) {
  const formData = getFormData(form);
  console.log(formData);
  const adultGuests = parseInt(formData.guests.adults);

  const errors = { dates: false, guests: false };
  Date.parse(formData.dates.from);

  if (
    isNaN(Date.parse(formData.dates.from)) ||
    isNaN(Date.parse(formData.dates.to))
  ) {
    errors.dates = true;
  }

  if (!adultGuests) {
    errors.guests = true;
  }

  return errors;
}

export function getFormData(form) {
  const dropdown = form.querySelector(".dropdown");
  const dates = getDates(form);
  const guests = Object.fromEntries(getCounters(dropdown));

  dates.from = moment(dates.from, "DD.MM.YYYY").format("YYYY-MM-DD");
  dates.to = moment(dates.to, "DD.MM.YYYY").format("YYYY-MM-DD");

  return { dates, guests };
}

function getDates(form) {
  const datePicker = form.querySelector(".date-range-picker");
  const dateFrom = datePicker.dataset.dateFrom;
  const dateTo = datePicker.dataset.dateTo;
  return { from: dateFrom, to: dateTo };
}
