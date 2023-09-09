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

function setSlideIdAttribute(slider, slideId) {
  slider.dataset.slideId = slideId;
}

function isSliderSnapped(slider) {
  const sliderLine = slider.querySelector(".card-room-slider__line");
  const divisionReminder = sliderLine.scrollLeft % getSlideWidth(slider);

  return divisionReminder < 5 || divisionReminder > getSlideWidth(slider) - 5;
}

function scrollSliderRight(slider) {
  const sliderLine = slider.querySelector(".card-room-slider__line");
  sliderLine.scrollLeft += getSlideWidth(slider);
}

function scrollSliderLeft(slider) {
  const sliderLine = slider.querySelector(".card-room-slider__line");
  sliderLine.scrollLeft -= getSlideWidth(slider);
}

roomCards.forEach((roomCard) => {
  const slider = roomCard.querySelector(".card-room-slider");
  const sliderLine = roomCard.querySelector(".card-room-slider__line");

  roomCard.addEventListener("click", handleSliderBtnClick);

  roomCard.addEventListener("click", handleCardRoomSlideClick);

  roomCard.addEventListener("mouseenter", handleRoomCardHover);
  roomCard.addEventListener("mouseleave", handleRoomCardUnhover);

  sliderLine.addEventListener("scroll", handleSliderScroll);

  updatePagination(slider);
});

function handleSliderBtnClick(event) {
  if (event.target.closest(".card-room-slider-btn")) {
    const roomCard = event.currentTarget;
    const slider = roomCard.querySelector(".card-room-slider");
    const sliderBtn = event.target.closest(".card-room-slider-btn");

    if (isSliderSnapped(slider)) {
      if (sliderBtn.classList.contains("card-room-slider__next-btn")) {
        scrollSliderRight(slider);
        // updateSlideIdAttribute(slider, true);
      } else {
        scrollSliderLeft(slider);
        // updateSlideIdAttribute(slider, false);
      }
      const slideId = calcSlideId(slider);

      setSlideIdAttribute(slider, slideId);
      updatePagination(slider);
    }
  }
}

function handleSliderScroll(event) {
  const slider = event.target.closest(".card-room-slider");

  if (isSliderSnapped(slider)) {
    const slideId = calcSlideId(slider);

    setSlideIdAttribute(slider, slideId);
    updatePagination(slider);
  }
}

function calcSlideId(slider) {
  const sliderLine = slider.querySelector(".card-room-slider__line");
  const slideId = Math.round(sliderLine.scrollLeft / getSlideWidth(slider)) + 1;

  return slideId;
}

function handleRoomCardHover(event) {
  const roomCard = event.currentTarget;
  const slider = roomCard.querySelector(".card-room-slider");

  showSliderButtons(slider);

  function showSliderButtons(slider) {
    slider.querySelectorAll(".card-room-slider-btn").forEach((button) => {
      button.classList.add("card-room-slider-btn_show");
    });
  }
}

function handleRoomCardUnhover(event) {
  const roomCard = event.currentTarget;
  const slider = roomCard.querySelector(".card-room-slider");

  showSliderButtons(slider);

  function showSliderButtons(slider) {
    slider.querySelectorAll(".card-room-slider-btn").forEach((button) => {
      button.classList.remove("card-room-slider-btn_show");
    });
  }
}

function handleCardRoomSlideClick(event) {
  const roomCard = event.currentTarget;

  if (event.target.closest(".card-room-slider__slide")) {
    const pageLink = roomCard.querySelector(".card-room__page-link").href;
    window.open(pageLink);
  }
}
