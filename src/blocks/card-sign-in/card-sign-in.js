import "../button/button";
import "../field/field";

const signinCards = document.querySelectorAll(".card-sign-in");

function handleSubmit(event) {
  event.preventDefault();
  console.log("Signed in!");
}

function handleSignupBtnClick(event) {
  if (event.target.closest(".card-sign-in__sign-up-btn")) {
    console.log("To signup!");
  }
}

signinCards.forEach((signinCard) => {
  const signinForm = signinCard.querySelector(".card-sign-in__form");
  signinForm.addEventListener("submit", handleSubmit);
  signinCard.addEventListener("click", handleSignupBtnClick);
});
