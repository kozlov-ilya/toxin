import '../dropdown/dropdown';
import '../counter/counter';
import '../button/button';
import * as c from '../counter/counter';
import * as d from '../dropdown/dropdown';

const guestWordForms = ['гость', 'гостя', 'гостей'];

function getProperWordForm(value, wordForms) {
  value = Math.abs(value) % 100;
  const lastDigit = value % 10;
  if (value > 10 && value < 20) return wordForms[2];
  if (lastDigit > 1 && lastDigit < 5) return wordForms[1];
  if (lastDigit == 1) return wordForms[0];
  return wordForms[2];
}

function loadDropdownCounters(dropdown) {
  let dropdownCountersMap = new Map();
  dropdown.querySelectorAll('.counter').forEach((counter) => {
    let counterLabel = c.getLabel(counter);
    let counterValue = c.getValue(counter);
    dropdownCountersMap.set(counterLabel, counterValue);
  });
  return dropdownCountersMap;
}

function areCountersZero(dropdown) {
  let result = true;
  dropdown.querySelectorAll('.counter').forEach((counter) => {
    if (c.getValue(counter)) {
      result = false;
    }
  });
  return result;
}

function showClearBtn(dropdown) {
  const clearBtn = dropdown.querySelector('.dropdown-guests__clear-btn');
  clearBtn.classList.remove('dropdown-guests__clear-btn_hidden');
}

function hideClearBtn(dropdown) {
  const clearBtn = dropdown.querySelector('.dropdown-guests__clear-btn');
  clearBtn.classList.remove('dropdown-guests__clear-btn_hidden');
}

function updateClearBtnVisibility(dropdown) {
  areCountersZero(dropdown) ? hideClearBtn(dropdown) : showClearBtn(dropdown);
}

function setDropdownSelectValue(dropdown, dropdownSelectValue) {
  let dropdownSelect = dropdown.querySelector('.dropdown__select');
  if (areCountersZero(dropdown)) {
    dropdownSelect.textContent = dropdown.dataset.defaultValue;
  } else {
    dropdownSelect.textContent = dropdownSelectValue;
  }
}

function updateDropdownSelectValue(dropdown) {
  let dropdownCountersMap = loadDropdownCounters(dropdown);
  let dropdownSelectValue;
  let guestsCount = 0;

  for (let [key, value] of dropdownCountersMap) {
    guestsCount += value;
  }
  dropdownSelectValue = `${guestsCount} ${getProperWordForm(
    guestsCount,
    guestWordForms
  )}`;

  setDropdownSelectValue(dropdown, dropdownSelectValue);
}

function resetCounters(dropdown) {
  dropdown.querySelectorAll('.counter').forEach((counter) => {
    c.resetCounter(counter);
  });
}

function handleDropdownCounterClick(event) {
  if (event.target.closest('.counter__button')) {
    let dropdown = event.target.closest('.dropdown');
    updateDropdownSelectValue(dropdown);
  }
}

function handleClearBtnClick(event) {
  if (event.target.closest('.dropdown-guests__clear-btn')) {
    const dropdown = event.currentTarget;
    resetCounters(dropdown);
    updateDropdownSelectValue(dropdown);
  }
}

function handleSubmitBtnClick(event) {
  if (event.target.closest('.dropdown-guests__submit-btn')) {
    const dropdown = event.currentTarget;
    d.closeDropdown(dropdown);
  }
}

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => {
  updateClearBtnVisibility(dropdown);
  dropdown.addEventListener('click', handleDropdownCounterClick);
  dropdown.addEventListener('click', handleClearBtnClick);
  dropdown.addEventListener('click', handleSubmitBtnClick);
});