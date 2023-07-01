const rateButtons = document.querySelectorAll('.rate-button');

/* Reset all stars to unchecked */
function resetRateButtonView(rateButton) {
  const stars = rateButton.querySelectorAll('.rate-button__star');
  stars.forEach((star) => {
    star.classList.remove('rate-button__star_checked');
  });
}

/* Update all stars according to value attribute */
function updateRateButtonView(rateButton) {
  const value = rateButton.dataset.value;
  const stars = rateButton.querySelectorAll('.rate-button__star');

  for (let i = 0; i < value; i++) {
    stars[i].classList.add('rate-button__star_checked');
  }
}

function getStarValue(rateButton, star) {
  const stars = rateButton.querySelectorAll('.rate-button__star');
  for (let starCount = 0; starCount < stars.length; starCount++) {
    let currentStar = stars[starCount];
    if (currentStar.isSameNode(star)) {
      starCount++;
      return starCount;
    }
  }
}

function updateRateButtonValueAttribute(rateButton, value) {
  rateButton.dataset.value = value;
}

function handleRateButtonStarClick(event) {
  const rateButton = event.currentTarget;
  if (event.target.closest('.rate-button__star')) {
    const rateButtonStar = event.target.closest('.rate-button__star');
    const starValue = getStarValue(rateButton, rateButtonStar);
    updateRateButtonValueAttribute(rateButton, starValue);
    resetRateButtonView(rateButton);
    updateRateButtonView(rateButton);
  }
}

rateButtons.forEach((rateButton) => {
  rateButton.addEventListener('click', handleRateButtonStarClick);
  resetRateButtonView(rateButton);
  updateRateButtonView(rateButton);
});
