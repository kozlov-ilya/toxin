import '../counter/counter';

function loadDropdownCounters(dropdown) {
  let dropdownCountersMap = new Map();

  dropdown.querySelectorAll('.counter').forEach((counter) => {
    let counterLabel = counter.querySelector('.counter__label').textContent;
    let counterValueStr = counter.querySelector('.counter__value').textContent;
    dropdownCountersMap.set(counterLabel, counterValueStr);
  });

  return dropdownCountersMap;
}

function areCountersZero(dropdown) {
  let result = true;
  dropdown.querySelectorAll('.counter').forEach((counter) => {
    if (parseInt(counter.querySelector('.counter__value').textContent)) {
      result = false;
    }
  });
  return result;
}

function checkIfCharLimitExceeded(string, limit) {
  return string.length > limit;
}

function setDropdownSelectValue(dropdown, dropdownSelectValue) {
  let dropdownSelect = dropdown.querySelector('.dropdown__select');
  if (areCountersZero(dropdown)) {
    dropdownSelect.textContent = dropdown.dataset.defaultValue;
  } else {
    dropdownSelect.textContent = dropdownSelectValue;
  }
}

function manageDropdownSelectValue(dropdown) {
  let dropdownCountersMap = loadDropdownCounters(dropdown);
  let dropdownSelectValue;
  const dropdownSelectCharLimit = 20;

  for (let [key, value] of dropdownCountersMap) {
    if (value > 0) {
      /* Add all non-zero valued counters to select value*/
      if (dropdownSelectValue) {
        /* Select value is not empty */
        let newDropdownSelectValue = dropdownSelectValue + `, ${value} ${key}`;
        if (
          checkIfCharLimitExceeded(
            newDropdownSelectValue,
            dropdownSelectCharLimit
          )
        ) {
          dropdownSelectValue += '...';
          setDropdownSelectValue(dropdown, dropdownSelectValue);
          return;
        } else {
          dropdownSelectValue = newDropdownSelectValue;
        }
      } else {
        /* Select value is empty */
        let newDropdownSelectValue = `${value} ${key}`;
        if (
          checkIfCharLimitExceeded(
            newDropdownSelectValue,
            dropdownSelectCharLimit
          )
        ) {
          dropdownSelectValue += '...';
          setDropdownSelectValue(dropdown, dropdownSelectValue);
          return;
        } else {
          dropdownSelectValue = newDropdownSelectValue;
        }
      }
    }
  }
  setDropdownSelectValue(dropdown, dropdownSelectValue);
}

function handleDropdownCounterButtonsClick(event) {
  if (event.target.closest('.counter__button')) {
    let dropdown = event.target.closest('.dropdown');
    manageDropdownSelectValue(dropdown);
  }
}

function handleDropdownSelectClick(event) {
  const dropdowns = document.querySelectorAll('.dropdown');
  /* Cross-Browser event */
  event = event || window.event;

  if (event.target.closest('.dropdown__select')) {
    /* Dropdown select was clicked */
    let dropdownSelect = event.target;
    let dropdown = dropdownSelect.parentElement;
    /* Close all dropdowns except clicked */
    dropdowns.forEach((e) => {
      if (!e.isEqualNode(dropdown)) e.classList.remove('dropdown_opened');
    });
    /* Toggle clicked dropdown */
    dropdown.classList.toggle('dropdown_opened');
    return;
  }

  if (!event.target.closest('.dropdown__menu')) {
    /* If clicked outside of a dropdown menu - close all dropdowns */
    dropdowns.forEach((e) => {
      e.classList.remove('dropdown_opened');
    });
  }
}

document.addEventListener('click', handleDropdownSelectClick);

const dropdowns = document.querySelectorAll('.dropdown');
console.log(dropdowns);
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', handleDropdownCounterButtonsClick);
});
