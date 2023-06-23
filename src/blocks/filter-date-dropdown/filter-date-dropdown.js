import moment from 'moment';

import '../date-dropdown/date-dropdown';
import '../range-calendar/range-calendar';

/* Locale settings */
moment.locale('ru');
moment.updateLocale('ru', {
  monthsShort: [
    'янв',
    'фев',
    'март',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сент',
    'окт',
    'нояб',
    'дек',
  ],
});

/* Functions */
function setFilterDateDropdownSelectValue(filterDateDropdown, value) {
  const dateDropdown = filterDateDropdown.querySelector('.date-dropdown');
  dateDropdown.querySelector('.date-dropdown__select').innerHTML = value;
}

function resetFilterDateDropdownSelectValue(filterDateDropdown) {
  const dateDropdown = filterDateDropdown.querySelector('.date-dropdown');
  dateDropdown.querySelector('.date-dropdown__select').innerHTML =
    dateDropdown.dataset.defaultValue;
}

function isFilterDateDropdownCalendarRangeValueFull(filterDateDropdown) {
  const calendar = filterDateDropdown.querySelector('.range-calendar');
  return calendar.dataset.dateFrom && calendar.dataset.dateTo;
}

function getFilterDateDropdownCalendarRangeValue(filterDateDropdown) {
  const calendar = filterDateDropdown.querySelector('.range-calendar');
  let value = '';
  value += moment(calendar.dataset.dateFrom).format('DD MMM');
  value += ' - ';
  value += moment(calendar.dataset.dateTo).format('DD MMM');
  return value;
}

function updateFilterDateDropdownSelectValue(filterDateDropdown) {
  console.log(isFilterDateDropdownCalendarRangeValueFull(filterDateDropdown));
  if (isFilterDateDropdownCalendarRangeValueFull(filterDateDropdown)) {
    const selectValue =
      getFilterDateDropdownCalendarRangeValue(filterDateDropdown);
    setFilterDateDropdownSelectValue(filterDateDropdown, selectValue);
  } else {
    resetFilterDateDropdownSelectValue(filterDateDropdown);
  }
}

/* Handlers */
function handleFilterDateDropdownSelectClick(event) {
  const filterDateDropdowns = document.querySelectorAll(
    '.filter-date-dropdown'
  );
  if (event.target.closest('.filter-date-dropdown__date-dropdown')) {
    const filterDateDropdown = event.target.closest('.filter-date-dropdown');

    /* Hide others filter date dropdown's popups */
    filterDateDropdowns.forEach((dropdown) => {
      if (!dropdown.isEqualNode(filterDateDropdown))
        dropdown.classList.remove('filter-date-dropdown_opened');
    });

    /* Show clicked date picker's poups */
    filterDateDropdown.classList.add('filter-date-dropdown_opened');

    return;
  }

  if (!event.target.closest('.filter-date-dropdown__popup')) {
    filterDateDropdowns.forEach((dropdown) => {
      dropdown.classList.remove('filter-date-dropdown_opened');
    });
  }
}

function handleFilterDateDropdownCalendarDayUnitBtnClick(event) {
  const filterDateDropdown = event.currentTarget;
  if (event.target.closest('.day-unit-btn')) {
    updateFilterDateDropdownSelectValue(filterDateDropdown);
  }
}

function handleFilterDateDropdownCalendarClearBtnClick(event) {
  const filterDateDropdown = event.currentTarget;
  if (event.target.closest('.range-calendar__clear-button')) {
    resetFilterDateDropdownSelectValue(filterDateDropdown);
  }
}

function handleFilterDateDropdownCalendarSubmitBtnClick(event) {
  const filterDateDropdown = event.currentTarget;
  if (event.target.closest('.range-calendar__submit-button')) {
    filterDateDropdown.classList.remove('filter-date-dropdown_opened');
  }
}

/* Add handlers */
document.addEventListener('click', handleFilterDateDropdownSelectClick);

const filterDateDropdowns = document.querySelectorAll('.filter-date-dropdown');
filterDateDropdowns.forEach((dropdown) => {
  dropdown.addEventListener(
    'click',
    handleFilterDateDropdownCalendarDayUnitBtnClick
  );
  dropdown.addEventListener(
    'click',
    handleFilterDateDropdownCalendarClearBtnClick
  );
  dropdown.addEventListener(
    'click',
    handleFilterDateDropdownCalendarSubmitBtnClick
  );
});
