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

updateSigninCard();

window.addEventListener("resize", (event) => {
  updateSigninCard();
});

function updateSigninCard() {
  const match = window.matchMedia("(max-width: 599px)");
  const signinCard = page.querySelector(".card-sign-in");

  if (match.matches) {
    makeSigninCardResponsive(signinCard);
  } else {
    makeSigninCardStatic(signinCard);
  }

  function makeSigninCardResponsive(signinCard) {
    signinCard.classList.add("card-sign-in_responsive");
    signinCard
      .querySelector(".card-sign-in__sign-in-btn")
      .classList.add("button_size_expanded");
  }

  function makeSigninCardStatic(signinCard) {
    signinCard.classList.remove("card-sign-in_responsive");
    signinCard
      .querySelector(".card-sign-in__sign-in-btn")
      .classList.remove("button_size_expanded");
  }
}
