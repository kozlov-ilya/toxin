import "../../blocks/header/header";
import "../../blocks/footer/footer";
import "../../blocks/filter-date-dropdown/filter-date-dropdown";
import "../../blocks/dropdown-guests/dropdown-guests";
import "../../blocks/range-slider/range-slider";
import "../../blocks/checkbox-button/checkbox-button";
import "../../blocks/rich-checkbox-button/rich-checkbox-button";
import "../../blocks/dropdown-features/dropdown-features";
import "../../blocks/expandable-checkbox-list/expandable-checkbox-list";
import "../../blocks/card-room/card-room";
import "../../blocks/pagination/pagination";
import { updateSlider } from "../../blocks/range-slider/range-slider";
import {
  setTotalItemsCount,
  updatePagination,
  getCurrentPage,
  setCurrentPage,
  highlightCurrentPageLink,
} from "../../blocks/pagination/pagination";

const page = document.querySelector(".page");
const header = document.querySelector(".header");
const burgerButton = header.querySelector(".burger-button");

const roomsArray = createRoomsArray();

initSearchPage();

function initSearchPage() {
  paintRooms();
  updateRoomFiltersMenu();
  updateSearchPagePagination();

  setPriceRangeObserver();
  setRoomPageChangeObserver();

  setFiltersButtonClickHandlers();
  setFiltersCloseButtonHandlers();

  arrangeRoomsIntoPages();
  showCurrentRoomPage();
}

function setRoomPageChangeObserver() {
  const pagination = document.querySelector(".pagination");
  const pageLinks = pagination.querySelector(".pagination__page-links");

  const observer = new MutationObserver(handleRoomPageChange);

  function handleRoomPageChange(mutationList, observer) {
    showCurrentRoomPage();
  }

  observer.observe(pageLinks, {
    attributes: true,
    attributeFilter: ["data-current-page"],
  });
}

function setPriceRangeObserver() {
  const slider = document.querySelector(".range-slider");

  const observer = new MutationObserver(handlePriceRangeChange);

  function handlePriceRangeChange(mutationList, observer) {
    if (slider.dataset.isDragging === "false") {
      paintRooms();
      updateSearchPagePagination();
      arrangeRoomsIntoPages();
      showCurrentRoomPage();
    }
  }

  observer.observe(slider, {
    attributes: true,
    attributeFilter: ["data-is-dragging"],
  });
}

function showCurrentRoomPage() {
  const pages = document.querySelectorAll(".rooms__room-page");
  const pagination = document.querySelector(".pagination");
  const currentPage = getCurrentPage(pagination);

  hideAllRoomPages(pages);

  pages.forEach((page) => {
    if (parseInt(page.dataset.pageId) === currentPage) {
      page.classList.add("rooms__room-page_show");
    }
  });

  function hideAllRoomPages(pages) {
    pages.forEach((page) => {
      page.classList.remove("rooms__room-page_show");
    });
  }
}

function arrangeRoomsIntoPages() {
  const rooms = getRoomsInPriceRange();
  const roomsBodyElem = document.querySelector(".rooms__body");

  const pages = [];
  while (rooms.length) {
    pages.push(rooms.splice(0, 12));
  }

  roomsBodyElem.textContent = "";

  pages.forEach((page, index) => {
    let pageElem = document.createElement("div");

    pageElem.classList.add("rooms__room-page");
    pageElem.dataset.pageId = index + 1;

    page.forEach((room) => {
      pageElem.appendChild(room);
    });

    roomsBodyElem.appendChild(pageElem);
  });
}

function updateSearchPagePagination() {
  const pagination = document.querySelector(".pagination");
  const roomsArray = getRoomsInPriceRange();
  const totalRoomsCount = roomsArray.length;

  setCurrentPage(pagination, 1);
  setTotalItemsCount(pagination, totalRoomsCount);
  updatePagination(pagination);
  highlightCurrentPageLink(pagination);
}

function paintRooms() {
  const roomsArray = getRooms();
  const roomsInPriceArray = getRoomsInPriceRange();

  roomsArray.forEach((roomElem) => {
    hideRoom(roomElem);
  });

  roomsInPriceArray.forEach((roomElem, roomIndex) => {
    showRoom(roomElem);
  });
}

function getRoomsInPriceRange() {
  const roomsArray = getRooms();

  return roomsArray.filter((roomElem) => {
    return isRoomInPriceRange(roomElem);
  });
}

function isRoomInPriceRange(roomElem) {
  const priceRange = getPriceRange();
  const roomPrice = getRoomPrice(roomElem);

  return roomPrice >= priceRange.min && roomPrice <= priceRange.max;
}

function getPriceRange() {
  const priceSliderElem = document.querySelector(".range-slider");
  const sliderMinThumbElem = priceSliderElem.querySelector(
    ".range-slider__thumb-min"
  );
  const sliderMaxThumbElem = priceSliderElem.querySelector(
    ".range-slider__thumb-max"
  );

  return {
    min: parseInt(sliderMinThumbElem.dataset.value),
    max: parseInt(sliderMaxThumbElem.dataset.value),
  };
}

function getRoomPrice(roomElem) {
  const roomPrice = roomElem.querySelector(".room-label").dataset.price;

  return parseInt(roomPrice);
}

function showRoom(roomElem) {
  roomElem.classList.add("card-room__show");
}

function hideRoom(roomElem) {
  roomElem.classList.remove("card-room__show");
}

function getRooms() {
  return roomsArray;
}

function createRoomsArray() {
  const roomsElem = document.querySelector(".rooms");

  return Array.from(roomsElem.querySelectorAll(".card-room"));
}

burgerButton.addEventListener("click", handleBurgerButtonClick);

function handleBurgerButtonClick(event) {
  /* Prevent page scrolling when menu is open */
  page.classList.toggle("page_scroll_lock");
}

function setFiltersButtonClickHandlers() {
  const filtersButton = document.querySelector(".rooms__filters-button");
  filtersButton.addEventListener("click", openRoomFiltersMenu);
}

function openRoomFiltersMenu(event) {
  const roomsFilters = document.querySelector(".rooms-filter");

  roomsFilters.classList.add("rooms-filter_show");
  page.classList.add("page_scroll_lock");

  const slider = document.querySelector(".range-slider");
  updateSlider(slider);
}

function setFiltersCloseButtonHandlers() {
  const filterCloseButton = document.querySelector(".filters-close-btn");
  filterCloseButton.addEventListener("click", closeRoomFiltersMenu);
}

function closeRoomFiltersMenu(event) {
  const roomsFilters = document.querySelector(".rooms-filter");

  roomsFilters.classList.remove("rooms-filter_show");
  page.classList.remove("page_scroll_lock");
}

window.addEventListener("resize", (event) => {
  updateRoomFiltersMenu();
});

function updateRoomFiltersMenu() {
  const match = window.matchMedia("(max-width: 1023px)");
  const roomFiltersMenuElem = page.querySelector(".rooms-filter");
  const slider = document.querySelector(".range-slider");

  updateSlider(slider);

  if (match.matches) {
    makeRoomFiltersMenuResponsive(roomFiltersMenuElem);
  } else {
    makeRoomFiltersMenuStatic(roomFiltersMenuElem);
  }

  function makeRoomFiltersMenuResponsive(filtersMenu) {
    filtersMenu
      .querySelector(".filter-date-dropdown")
      .classList.add("filter-date-dropdown_size_responsive");
    filtersMenu
      .querySelector(".dropdown-guests")
      .classList.add("dropdown-guests_size_responsive");
    filtersMenu
      .querySelector(".dropdown-features")
      .classList.add("dropdown-features_size_responsive");
    filtersMenu
      .querySelector(".range-slider")
      .classList.add("range-slider_size_responsive");
  }

  function makeRoomFiltersMenuStatic(filtersMenu) {
    filtersMenu
      .querySelector(".filter-date-dropdown")
      .classList.remove("filter-date-dropdown_size_responsive");
    filtersMenu
      .querySelector(".dropdown-guests")
      .classList.remove("dropdown-guests_size_responsive");
    filtersMenu
      .querySelector(".dropdown-features")
      .classList.remove("dropdown-features_size_responsive");
    filtersMenu
      .querySelector(".range-slider")
      .classList.remove("range-slider_size_responsive");
  }
}
