import '../dropdown/dropdown';
import '../counter/counter';
import * as c from '../counter/counter';

function getProperWordForm(value, wordForms) {
  value = Math.abs(value) % 100;
  const lastDigit = value % 10;
  if (value > 10 && value < 20) return wordForms[2];
  if (lastDigit > 1 && lastDigit < 5) return wordForms[1];
  if (lastDigit == 1) return wordForms[0];
  return wordForms[2];
}

function getCounterWordForms(counter) {
  const wordFormsStr = counter.dataset.wordForms;
  return wordFormsStr.split(',');
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

function setDropdownSelectValue(dropdown, dropdownSelectValue) {
  let dropdownSelect = dropdown.querySelector('.dropdown__select');
  if (areCountersZero(dropdown)) {
    dropdownSelect.textContent = dropdown.dataset.defaultValue;
  } else {
    dropdownSelect.textContent = dropdownSelectValue;
  }
}

function cutSelectValueArray(array, charLimit) {
  let charCount = 0;
  let newSelectValueArray = [];
  for (let label of array) {
    const labelLength = label.length;
    if (charCount + labelLength > charLimit) {
      return { array: newSelectValueArray, cut: true };
    } else {
      newSelectValueArray.push(label);
      charCount += labelLength;
    }
  }
  return { array: newSelectValueArray, cut: false };
}

function updateDropdownSelectValue(dropdown) {
  const counters = dropdown.querySelectorAll('.counter');
  const charLimit = 20;
  let selectValueArray = [];

  counters.forEach((counter) => {
    const label = c.getLabel(counter);
    const value = c.getValue(counter);
    const wordForms = getCounterWordForms(counter);

    if (value) {
      const labelPart = `${value} ${getProperWordForm(value, wordForms)}`;
      selectValueArray.push(labelPart);
    }
  });
  const selectValueObj = cutSelectValueArray(selectValueArray, charLimit);
  let selectValue = selectValueObj.array.join(', ');
  console.log(selectValueObj);
  if (selectValueObj.cut) {
    selectValue = `${selectValue}...`;
  }
  setDropdownSelectValue(dropdown, selectValue);
}

function updateDropdown(dropdown) {
  updateDropdownSelectValue(dropdown);
}

function handleDropdownCounterClick(event) {
  if (event.target.closest('.counter__button')) {
    let dropdown = event.target.closest('.dropdown');
    updateDropdown(dropdown);
  }
}

const dropdowns = document.querySelectorAll('.dropdown-features');
dropdowns.forEach((dropdown) => {
  updateDropdown(dropdown);
  dropdown.addEventListener('click', handleDropdownCounterClick);
});
