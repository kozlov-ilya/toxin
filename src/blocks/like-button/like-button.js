const likeButtons = document.querySelectorAll('.like-button');

function isLikeButtonChecked(likeButton) {
  return likeButton.classList.contains('like-button_checked');
}

function addLikeButtonValue(likeButton) {
  const valueElem = likeButton.querySelector('.like-button__value');
  const oldValue = parseInt(valueElem.innerHTML);
  const newValue = oldValue + 1;
  valueElem.innerHTML = newValue;
}

function subtractLikeButtonValue(likeButton) {
  const valueElem = likeButton.querySelector('.like-button__value');
  const oldValue = parseInt(valueElem.innerHTML);
  const newValue = oldValue - 1;
  valueElem.innerHTML = newValue;
}

function handleLikeButtonClick(event) {
  const likeButton = event.currentTarget;
  if (isLikeButtonChecked(likeButton)) {
    subtractLikeButtonValue(likeButton);
  } else {
    addLikeButtonValue(likeButton);
  }
  likeButton.classList.toggle('like-button_checked');
}

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', handleLikeButtonClick);
});
