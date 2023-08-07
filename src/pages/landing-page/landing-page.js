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

burgerButton.addEventListener("click", handleBurgerButtonClick);
