const rateButtons = document.querySelectorAll(".rate-button");

function isActive(rateButton) {
  return rateButton.hasAttribute("data-is-active");
}

/* Reset all stars to unchecked */
function resetRateButtonView(rateButton) {
  const stars = rateButton.querySelectorAll(".rate-button__star");
  stars.forEach((star) => {
    star.classList.remove("rate-button__star_checked");
  });
}

/* Update all stars according to value attribute */
function updateRateButtonView(rateButton) {
  const value = rateButton.dataset.value;
  const stars = rateButton.querySelectorAll(".rate-button__star");

  for (let i = 0; i < value; i++) {
    stars[i].classList.add("rate-button__star_checked");
  }
}

function getStarValue(rateButton, star) {
  const stars = rateButton.querySelectorAll(".rate-button__star");
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

function paintStars() {
  const rateButtons = document.querySelectorAll(".rate-button");

  rateButtons.forEach((rateButton, index) => {
    const gradients = rateButton.querySelectorAll(".star-gradient");
    const stars = rateButton.querySelectorAll(".rate-button__star");

    gradients.forEach((gradient) => {
      gradient.id = `rate-button-gradient-${index}`;
    });

    stars.forEach((star) => {
      star.querySelector(
        ".rate-button__star-bg"
      ).style = `fill: url(#rate-button-gradient-${index})`;
      star.querySelector(
        ".rate-button__star-border"
      ).style = `fill: url(#rate-button-gradient-${index})`;
    });
  });
}

function handleRateButtonStarClick(event) {
  const rateButton = event.currentTarget;
  if (event.target.closest(".rate-button__star")) {
    if (isActive(rateButton)) {
      /* Button is active */
      const rateButtonStar = event.target.closest(".rate-button__star");
      const starValue = getStarValue(rateButton, rateButtonStar);
      updateRateButtonValueAttribute(rateButton, starValue);
      resetRateButtonView(rateButton);
      updateRateButtonView(rateButton);
    }
  }
}

rateButtons.forEach((rateButton) => {
  rateButton.addEventListener("click", handleRateButtonStarClick);
  resetRateButtonView(rateButton);
  updateRateButtonView(rateButton);
});

paintStars();
