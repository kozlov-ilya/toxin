import moment from "moment";

import "../date-dropdown/date-dropdown";
import "../range-calendar/range-calendar";

function setDatePickerDateFromAttributes(datePicker, dateFrom) {
  datePicker.dataset.dateFrom = dateFrom;
}

function setDatePickerDateToAttributes(datePicker, dateTo) {
  datePicker.dataset.dateTo = dateTo;
}

function setDateDropdownSelectValue(dropdown, value) {
  dropdown.querySelector(".date-dropdown__select").innerHTML = value;
}

function resetDateDropdownValue(dropdown) {
  dropdown.querySelector(".date-dropdown__select").innerHTML =
    dropdown.dataset.defaultValue;
}

function resetDateDropdowns(datePicker) {
  const dropdownFrom = datePicker.querySelector(
    ".date-range-picker__date-dropdown-from"
  );
  const dropdownTo = datePicker.querySelector(
    ".date-range-picker__date-dropdown-to"
  );
  resetDateDropdownValue(dropdownFrom);
  resetDateDropdownValue(dropdownTo);
  setDatePickerDateFromAttributes(datePicker, "");
  setDatePickerDateToAttributes(datePicker, "");
}

export function updateDatePickerDropdowns(datePicker) {
  const calendar = datePicker.querySelector(".range-calendar");
  const dropdownFrom = datePicker.querySelector(
    ".date-range-picker__date-dropdown-from"
  );
  const dropdownTo = datePicker.querySelector(
    ".date-range-picker__date-dropdown-to"
  );
  let calendarFrom = calendar.dataset.dateFrom;
  let calendarTo = calendar.dataset.dateTo;

  if (calendarFrom) {
    calendarFrom = moment(calendarFrom).format("DD.MM.YYYY");
    setDateDropdownSelectValue(dropdownFrom, calendarFrom);
    setDatePickerDateFromAttributes(datePicker, calendarFrom);
  } else {
    resetDateDropdownValue(dropdownFrom);
  }
  if (calendarTo) {
    calendarTo = moment(calendarTo).format("DD.MM.YYYY");
    setDateDropdownSelectValue(dropdownTo, calendarTo);
    setDatePickerDateToAttributes(datePicker, calendarTo);
  } else {
    resetDateDropdownValue(dropdownTo);
  }
}

/* Handlers */
function handleDatePickerSelectClick(event) {
  const datePickers = document.querySelectorAll(".date-range-picker");
  if (event.target.closest(".date-range-picker__date-dropdown")) {
    let datePicker = event.target.closest(".date-range-picker");

    /* Hide others date picker's poups */
    datePickers.forEach((e) => {
      if (!e.isEqualNode(datePicker))
        e.classList.remove("date-range-picker_opened");
    });

    /* Show clicked date picker's poups */
    datePicker.classList.add("date-range-picker_opened");

    return;
  }

  if (!event.target.closest(".date-range-picker__popup")) {
    datePickers.forEach((e) => {
      e.classList.remove("date-range-picker_opened");
    });
  }
}

function handleDatePickerCalendarDayUnitBtnClick(event) {
  const datePicker = event.currentTarget;
  if (event.target.closest(".day-unit-btn")) {
    updateDatePickerDropdowns(datePicker);
  }
}

function handleDatePickerCalendarClearBtnClick(event) {
  const datePicker = event.currentTarget;
  if (event.target.closest(".range-calendar__clear-button")) {
    resetDateDropdowns(datePicker);
  }
}

function handleDatePickerCalendarSubmitBtnClick(event) {
  const datePicker = event.currentTarget;
  if (event.target.closest(".range-calendar__submit-button")) {
    datePicker.classList.remove("date-range-picker_opened");
  }
}

/* Add handlers */
document.addEventListener("click", handleDatePickerSelectClick);

const datePickers = document.querySelectorAll(".date-range-picker");
datePickers.forEach((datePicker) => {
  updateDatePickerDropdowns(datePicker);
  datePicker.addEventListener("click", handleDatePickerCalendarDayUnitBtnClick);
  datePicker.addEventListener("click", handleDatePickerCalendarClearBtnClick);
  datePicker.addEventListener("click", handleDatePickerCalendarSubmitBtnClick);
});
