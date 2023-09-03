import "../../blocks/header/header";
import "../../blocks/footer/footer";
import "../../blocks/card-room-search/card-room-search";

const page = document.querySelector(".page");
const header = document.querySelector(".header");
const burgerButton = header.querySelector(".burger-button");

function handleBurgerButtonClick(event) {
  /* Prevent page scrolling */
  page.classList.toggle("page_scroll_lock");
}

function makeSearchCardResponsive(card) {
  card.classList.add("card_expanded_yes");
  card
    .querySelector(".card-room-search__search-btn")
    .classList.add("button_size_expanded");
  card
    .querySelector(".dropdown-guests")
    .classList.add("dropdown-guests_size_responsive");
  card
    .querySelector(".dropdown__select")
    .classList.add("field_size_responsive");
  card
    .querySelector(".date-range-picker")
    .classList.add("date-range-picker_responsive");
  card.querySelectorAll(".date-dropdown__select").forEach((select) => {
    select.classList.add("field_size_responsive");
  });
}

function makeSearchCardStatic(card) {
  card.classList.remove("card_expanded_yes");
  card
    .querySelector(".card-room-search__search-btn")
    .classList.remove("button_size_expanded");
  card
    .querySelector(".dropdown-guests")
    .classList.remove("dropdown-guests_size_responsive");
  card
    .querySelector(".dropdown__select")
    .classList.remove("field_size_responsive");
  card
    .querySelector(".date-range-picker")
    .classList.remove("date-range-picker_responsive");
  card.querySelectorAll(".date-dropdown__select").forEach((select) => {
    select.classList.remove("field_size_responsive");
  });
}

burgerButton.addEventListener("click", handleBurgerButtonClick);

window.addEventListener("resize", (event) => {
  updateSearchCard();
});

updateSearchCard();

function updateSearchCard() {
  const match = window.matchMedia("(max-width: 599px)");
  const searchCards = page.querySelectorAll(".card-room-search");
  if (match.matches) {
    searchCards.forEach((card) => {
      makeSearchCardResponsive(card);
    });
  } else {
    searchCards.forEach((card) => {
      makeSearchCardStatic(card);
    });
  }
}
