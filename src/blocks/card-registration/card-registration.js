import '../button/button';
import '../radio-button/radio-button';
import '../field/field';
import '../masked-text-field/masked-text-field';
import '../toggle/toggle';

const signupCards = document.querySelectorAll('.card-registration');

function isFormDataValid(signupCard) {
  const signupForm = signupCard.querySelector('.card-registration__form');
}

function handleSubmit(event) {
  event.preventDefault();
  console.log('Signed up!');
}

function handleLoginBtnClick(event) {
  if (event.target.closest('.card-registration__login-btn')) {
    console.log('To login!');
  }
}

signupCards.forEach((signupCard) => {
  const signupForm = signupCard.querySelector('.card-registration__form');

  signupForm.addEventListener('submit', handleSubmit);
  signupCard.addEventListener('click', handleLoginBtnClick);
});
