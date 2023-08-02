import "../rate-button/rate-button";
import "../room-label/room-label";

const roomCards = document.querySelectorAll(".card-room");

function getSlideWidth(slider) {
  const slide = slider.querySelector(".card-room-slider__slide");
  return slide.clientWidth;
}

function getSlideId(slider) {
  return parseInt(slider.dataset.slideId);
}

function getSlidesCount(slider) {
  return parseInt(slider.dataset.slidesCount);
}

function updatePagination(slider) {
  const paginationItems = slider.querySelectorAll(
    ".card-room-slider__pagination-item"
  );
  const slideId = getSlideId(slider);
  paginationItems.forEach((item) => {
    item.classList.remove("card-room-slider__pagination-item_colored");
  });
  paginationItems[slideId - 1].classList.add(
    "card-room-slider__pagination-item_colored"
  );
}

function updateSlideIdAttribute(slider, up) {
  let slideId = getSlideId(slider);
  const slidesCount = getSlidesCount(slider);
  if (up) {
    slideId = slideId < slidesCount ? slideId + 1 : slideId;
  } else {
    slideId = slideId > 1 ? slideId - 1 : slideId;
  }
  slider.dataset.slideId = slideId;
  console.log(slideId);
}

function scrollSliderRight(slider) {
  const sliderLine = slider.querySelector(".card-room-slider__line");
  sliderLine.scrollLeft += getSlideWidth(slider);
}

function scrollSliderLeft(slider) {
  const sliderLine = slider.querySelector(".card-room-slider__line");
  sliderLine.scrollLeft -= getSlideWidth(slider);
}

function handleSliderBtnClick(event) {
  if (event.target.closest(".card-room-slider-btn")) {
    const roomCard = event.currentTarget;
    const slider = roomCard.querySelector(".card-room-slider");
    const sliderBtn = event.target.closest(".card-room-slider-btn");

    if (sliderBtn.classList.contains("card-room-slider__next-btn")) {
      scrollSliderRight(slider);
      updateSlideIdAttribute(slider, true);
    } else {
      scrollSliderLeft(slider);
      updateSlideIdAttribute(slider, false);
    }

    updatePagination(slider);
  }
}

roomCards.forEach((roomCard) => {
  const slider = roomCard.querySelector(".card-room-slider");
  roomCard.addEventListener("click", handleSliderBtnClick);
  updatePagination(slider);
});
