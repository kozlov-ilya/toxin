import moment from "moment";
import "../date-range-picker/date-range-picker";
import "../dropdown-guests/dropdown-guests";
import "../button/button";
import "../room-label/room-label";
import { getCounters } from "../dropdown-guests/dropdown-guests";

const bookCards = document.querySelectorAll(".card-room-book");

function addSpacesToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function addClassToElem(elem, className) {
  elem.classList.add(className);
}

function getBookDates(card) {
  const datePicker = card.querySelector(".date-range-picker");
  const dateFrom = datePicker.dataset.dateFrom;
  const dateTo = datePicker.dataset.dateTo;
  return { from: dateFrom, to: dateTo };
}

function getRoomPrice(card) {
  return parseInt(card.dataset.roomPrice);
}

function areBookDatesValid(card) {
  const bookDates = getBookDates(card);
  return bookDates.from && bookDates.to ? true : false;
}

function calcBookDays(card) {
  if (areBookDatesValid(card)) {
    const bookDates = getBookDates(card);
    const bookDays = moment(bookDates.to, "DD.MM.YYYY").diff(
      moment(bookDates.from, "DD.MM.YYYY"),
      "days"
    );
    return bookDays;
  }
  return 0;
}

function calcBookPrice(card) {
  const bookDays = calcBookDays(card);
  const roomPrice = getRoomPrice(card);
  return bookDays * roomPrice;
}

function fillBookPriceElem(card) {
  const bookPriceInfoElem = card.querySelector(".book-price-info");
  const bookPriceInfoLabelElem = bookPriceInfoElem.querySelector(
    ".price-info__item-label"
  );
  const bookPriceInfoValueElem = bookPriceInfoElem.querySelector(
    ".price-info__item-value"
  );
  const bookDays = calcBookDays(card);
  const roomPrice = getRoomPrice(card);
  const bookPrice = calcBookPrice(card);
  bookPriceInfoLabelElem.textContent = `${addSpacesToNumber(
    roomPrice
  )}₽ x ${bookDays} суток`;
  bookPriceInfoValueElem.textContent = `${addSpacesToNumber(bookPrice)}₽`;
}

function fillServicePriceElem(card) {
  const servicePriceInfoElem = card.querySelector(".service-price-info");
  const servicePriceInfoLabelElem = servicePriceInfoElem.querySelector(
    ".price-info__item-label"
  );
  const servicePriceInfoValueElem = servicePriceInfoElem.querySelector(
    ".price-info__item-value"
  );
  const discount = card.querySelector(".price-info").dataset.discount;
  const servicePrice = card.querySelector(".price-info").dataset.servicePrice;
  servicePriceInfoLabelElem.textContent = `Сбор за услуги: скидка ${discount}₽`;
  servicePriceInfoValueElem.textContent = `${servicePrice}₽`;
}

function fillAdditionalPriceElem(card) {
  const additionalPriceInfoElem = card.querySelector(".additional-price-info");
  const additionalPriceInfoLabelElem = additionalPriceInfoElem.querySelector(
    ".price-info__item-label"
  );
  const additionalPriceInfoValueElem = additionalPriceInfoElem.querySelector(
    ".price-info__item-value"
  );
  const addPrice = card.querySelector(".price-info").dataset.additionalPrice;
  additionalPriceInfoLabelElem.textContent = `Сбор за дополнительные услуги`;
  additionalPriceInfoValueElem.textContent = `${addPrice}₽`;
}

function fillPriceInfo(card) {
  fillBookPriceElem(card);
  fillServicePriceElem(card);
  fillAdditionalPriceElem(card);
}

function calcTotalPrice(card) {
  const bookPrice = calcBookPrice(card);
  const discount = parseInt(card.querySelector(".price-info").dataset.discount);
  const servicePrice = parseInt(
    card.querySelector(".price-info").dataset.servicePrice
  );
  const addPrice = parseInt(
    card.querySelector(".price-info").dataset.additionalPrice
  );
  return bookPrice + servicePrice + addPrice - discount;
}

function fillTotalPriceElem(card) {
  const totalPriceElem = card.querySelector(".total-price");
  const totalPriceLabelElem = totalPriceElem.querySelector(
    ".total-price__label"
  );
  const totalPriceValueElem = totalPriceElem.querySelector(
    ".total-price__value"
  );
  const totalPrice = calcTotalPrice(card);
  totalPriceLabelElem.textContent = "Итого";
  totalPriceValueElem.textContent = `${addSpacesToNumber(totalPrice)}₽`;
}

function openMoreInfoPopup(priceItem) {
  const popupElem = priceItem.querySelector(".price-info__popup");
  popupElem.classList.add("price-info__popup_opened");
}

function closeMoreInfoPopup(priceItem) {
  const popupElem = priceItem.querySelector(".price-info__popup");
  popupElem.classList.remove("price-info__popup_opened");
}

function handleMoreInfoHover(event) {
  if (event.target.closest(".price-info__item-more-info")) {
    const moreInfoElem = event.target.closest(".price-info__item-more-info");
    openMoreInfoPopup(moreInfoElem.closest(".price-info__item"));
  }
}

function handleMoreInfoUnhover(event) {
  if (event.target.closest(".price-info__item-more-info")) {
    const moreInfoElem = event.target.closest(".price-info__item-more-info");
    closeMoreInfoPopup(moreInfoElem.closest(".price-info__item"));
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const cardForm = event.currentTarget;
  console.log(getBookDates(cardForm));
}

bookCards.forEach((card) => {
  const cardForm = card.querySelector(".card-room-book__form");
  fillPriceInfo(card);
  fillTotalPriceElem(card);
  cardForm.addEventListener("submit", handleSubmit);
  card.addEventListener("mouseover", handleMoreInfoHover);
  card.addEventListener("mouseout", handleMoreInfoUnhover);
});
