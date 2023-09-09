import "../../blocks/header/header";
import "../../blocks/footer/footer";
import "../../blocks/card-sign-in/card-sign-in";

const page = document.querySelector(".page");
const header = document.querySelector(".header");
const burgerButton = header.querySelector(".burger-button");

burgerButton.addEventListener("click", handleBurgerButtonClick);

function handleBurgerButtonClick(event) {
  /* Prevent page scrolling */
  page.classList.toggle("page_scroll_lock");
}

updateRegistrationCard();

window.addEventListener("resize", (event) => {
  updateRegistrationCard();
});

function updateRegistrationCard() {
  const match = window.matchMedia("(max-width: 599px)");
  const registrationCard = page.querySelector(".card-registration");

  if (match.matches) {
    makeRegistrationCardResponsive(registrationCard);
  } else {
    makeRegistrationCardStatic(registrationCard);
  }

  function makeRegistrationCardResponsive(registrationCard) {
    registrationCard.classList.add("card-registration_size_responsive");
    registrationCard
      .querySelector(".card-registration__signup-btn")
      .classList.add("button_size_expanded");
  }

  function makeRegistrationCardStatic(registrationCard) {
    registrationCard.classList.remove("card-registration_size_responsive");
    registrationCard
      .querySelector(".card-registration__signup-btn")
      .classList.remove("button_size_expanded");
  }
}
