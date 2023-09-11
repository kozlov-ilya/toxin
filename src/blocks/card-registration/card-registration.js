import "../button/button";
import "../radio-button/radio-button";
import "../field/field";
import "../masked-text-field/masked-text-field";
import "../toggle/toggle";

const signupCards = document.querySelectorAll(".card-registration");

function isFormDataValid(signupCard) {
  const signupForm = signupCard.querySelector(".card-registration__form");
}

function handleSubmit(event) {
  event.preventDefault();
  window.location.href = "landing-page.html";
}

signupCards.forEach((signupCard) => {
  const signupForm = signupCard.querySelector(".card-registration__form");

  signupForm.addEventListener("submit", handleSubmit);
});
