import moment from "moment";

import "../date-dropdown/date-dropdown";
import "../range-calendar/range-calendar";
import { updateCalendarDates } from "../range-calendar/range-calendar";

/* Locale settings */
moment.locale("ru");
moment.updateLocale("ru", {
  monthsShort: [
    "янв",
    "фев",
    "март",
    "апр",
    "май",
    "июнь",
    "июль",
    "авг",
    "сент",
    "окт",
    "нояб",
    "дек",
  ],
});

const filterDateDropdowns = document.querySelectorAll(".filter-date-dropdown");

filterDateDropdowns.forEach((dropdown) => {
  updateFilterDateDropdownSelectValue(dropdown);

  dropdown.addEventListener(
    "click",
    handleFilterDateDropdownCalendarDayUnitBtnClick
  );
  dropdown.addEventListener(
    "click",
    handleFilterDateDropdownCalendarClearBtnClick
  );
  dropdown.addEventListener(
    "click",
    handleFilterDateDropdownCalendarSubmitBtnClick
  );
});

function handleFilterDateDropdownCalendarDayUnitBtnClick(event) {
  const filterDateDropdown = event.currentTarget;
  if (event.target.closest(".day-unit-btn")) {
    updateFilterDateDropdownSelectValue(filterDateDropdown);
  }
}

function handleFilterDateDropdownCalendarClearBtnClick(event) {
  const filterDateDropdown = event.currentTarget;
  if (event.target.closest(".range-calendar__clear-button")) {
    resetDropdownDateAttributes(filterDateDropdown);
    resetFilterDateDropdownSelectValue(filterDateDropdown);
  }
}

function handleFilterDateDropdownCalendarSubmitBtnClick(event) {
  const filterDateDropdown = event.currentTarget;
  if (event.target.closest(".range-calendar__submit-button")) {
    closeDropdown(filterDateDropdown);
  }
}

document.addEventListener("click", handleFilterDateDropdownSelectClick);

function handleFilterDateDropdownSelectClick(event) {
  if (event.target.closest(".filter-date-dropdown__date-dropdown")) {
    const filterDateDropdown = event.target.closest(".filter-date-dropdown");
    closeAllDropdownsExceptOne(filterDateDropdown);
    /* Open clicked dropdown */
    openDropdown(filterDateDropdown);
    return;
  }

  if (!event.target.closest(".filter-date-dropdown__popup")) {
    closeAllDropdowns();
  }
}

function openDropdown(dropdown) {
  dropdown.classList.add("filter-date-dropdown_opened");
}

function closeDropdown(dropdown) {
  dropdown.classList.remove("filter-date-dropdown_opened");
}

function closeAllDropdownsExceptOne(dropdownToBeOpen) {
  const filterDateDropdowns = document.querySelectorAll(
    ".filter-date-dropdown"
  );
  filterDateDropdowns.forEach((dropdown) => {
    if (!dropdown.isEqualNode(dropdownToBeOpen)) {
      closeDropdown(dropdown);
    }
  });
}

function closeAllDropdowns() {
  const filterDateDropdowns = document.querySelectorAll(
    ".filter-date-dropdown"
  );
  filterDateDropdowns.forEach((dropdown) => {
    closeDropdown(dropdown);
  });
}

export function getDropdownDateAttributes(filterDateDropdown) {
  return {
    from: filterDateDropdown.dataset.dateFrom,
    to: filterDateDropdown.dataset.dateTo,
  };
}

export function setDropdownDateAttributes(
  filterDateDropdown,
  dateFrom,
  dateTo
) {
  filterDateDropdown.dataset.dateFrom = dateFrom;
  filterDateDropdown.dataset.dateTo = dateTo;
}

function resetDropdownDateAttributes(filterDateDropdown) {
  filterDateDropdown.dataset.dateFrom = "";
  filterDateDropdown.dataset.dateTo = "";
}

function getDatesFromCalendar(filterDateDropdown) {
  const calendar = filterDateDropdown.querySelector(".range-calendar");
  return { from: calendar.dataset.dateFrom, to: calendar.dataset.dateTo };
}

function updateDropdownDateAttributesFromCalendar(filterDateDropdown) {
  const dates = getDatesFromCalendar(filterDateDropdown);
  setDropdownDateAttributes(filterDateDropdown, dates.from, dates.to);
}

export function setFilterDateDropdownSelectValue(filterDateDropdown, value) {
  const dateDropdown = filterDateDropdown.querySelector(".date-dropdown");
  dateDropdown.querySelector(".date-dropdown__select").textContent = value;
}

function resetFilterDateDropdownSelectValue(filterDateDropdown) {
  const dateDropdown = filterDateDropdown.querySelector(".date-dropdown");
  dateDropdown.querySelector(".date-dropdown__select").textContent =
    dateDropdown.dataset.defaultValue;
}

function isCalendarDateValid(filterDateDropdown) {
  const dates = getDatesFromCalendar(filterDateDropdown);
  return Boolean(dates.from && dates.to);
}

export function createFilterDateDropdownSelectValue(filterDateDropdown) {
  const dates = getDropdownDateAttributes(filterDateDropdown);
  let value = "";
  value += moment(dates.from).format("DD MMM");
  value += " - ";
  value += moment(dates.to).format("DD MMM");
  return value;
}

function updateFilterDateDropdownSelectValue(filterDateDropdown) {
  if (isCalendarDateValid(filterDateDropdown)) {
    updateDropdownDateAttributesFromCalendar(filterDateDropdown);
    const selectValue = createFilterDateDropdownSelectValue(filterDateDropdown);
    setFilterDateDropdownSelectValue(filterDateDropdown, selectValue);
  } else {
    resetDropdownDateAttributes(filterDateDropdown);
    resetFilterDateDropdownSelectValue(filterDateDropdown);
  }
}

export function setFilterDateDropdownDates(
  filterDateDropdown,
  dateFrom,
  dateTo
) {
  const calendar = filterDateDropdown.querySelector(".range-calendar");

  updateCalendarDates(calendar, dateFrom, dateTo);

  updateFilterDateDropdownSelectValue(filterDateDropdown);
}
