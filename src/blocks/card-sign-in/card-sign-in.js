import "../button/button";
import "../field/field";

const signinCards = document.querySelectorAll(".card-sign-in");

function handleSubmit(event) {
  event.preventDefault();
  window.location.href = "../index.html";
}

signinCards.forEach((signinCard) => {
  const signinForm = signinCard.querySelector(".card-sign-in__form");
  signinForm.addEventListener("submit", handleSubmit);
});
