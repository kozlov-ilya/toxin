import "../dropdown/dropdown";
import "../counter/counter";
import "../button/button";
import * as c from "../counter/counter";
import * as d from "../dropdown/dropdown";

const guestWordForms = ["гость", "гостя", "гостей"];

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
  dropdown.querySelectorAll(".counter").forEach((counter) => {
    let counterLabel = c.getLabel(counter);
    let counterValue = c.getValue(counter);
    dropdownCountersMap.set(counterLabel, counterValue);
  });
  return dropdownCountersMap;
}

function areCountersZero(dropdown) {
  let result = true;
  dropdown.querySelectorAll(".counter").forEach((counter) => {
    if (c.getValue(counter)) {
      result = false;
    }
  });
  return result;
}

function showClearBtn(dropdown) {
  const clearBtn = dropdown.querySelector(".dropdown-guests__clear-btn");
  clearBtn.classList.remove("dropdown-guests__clear-btn_hidden");
}

function hideClearBtn(dropdown) {
  const clearBtn = dropdown.querySelector(".dropdown-guests__clear-btn");
  clearBtn.classList.add("dropdown-guests__clear-btn_hidden");
}

function updateClearBtnVisibility(dropdown) {
  areCountersZero(dropdown) ? hideClearBtn(dropdown) : showClearBtn(dropdown);
}

function setDropdownSelectValue(dropdown, dropdownSelectValue) {
  let dropdownSelect = dropdown.querySelector(".dropdown__select");
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

function updateDropdown(dropdown) {
  updateDropdownSelectValue(dropdown);
  updateClearBtnVisibility(dropdown);
}

function resetCounters(dropdown) {
  dropdown.querySelectorAll(".counter").forEach((counter) => {
    c.resetCounter(counter);
  });
}

function handleDropdownCounterClick(event) {
  if (event.target.closest(".counter__button")) {
    let dropdown = event.target.closest(".dropdown");
    updateDropdown(dropdown);
  }
}

function handleClearBtnClick(event) {
  if (event.target.closest(".dropdown-guests__clear-btn")) {
    const dropdown = event.currentTarget;
    resetCounters(dropdown);
    updateDropdown(dropdown);
  }
}

function handleSubmitBtnClick(event) {
  if (event.target.closest(".dropdown-guests__submit-btn")) {
    const dropdown = event.currentTarget;
    d.closeDropdown(dropdown);
  }
}

const dropdowns = document.querySelectorAll(".dropdown-guests");
dropdowns.forEach((dropdown) => {
  updateDropdown(dropdown);
  dropdown.addEventListener("click", handleDropdownCounterClick);
  dropdown.addEventListener("click", handleClearBtnClick);
  dropdown.addEventListener("click", handleSubmitBtnClick);
});

export function getCounters(dropdown) {
  let countersMap = new Map();

  dropdown.querySelectorAll(".counter").forEach((counter) => {
    countersMap.set(counter.dataset.name, counter.dataset.value);
  });

  return countersMap;
}

export function setCounters(dropdown, counters) {
  const counterElems = Array.from(dropdown.querySelectorAll(".counter"));

  for (const counter in counters) {
    c.updateValue(
      counterElems.find((counterElem) => {
        return counterElem.dataset.name === counter;
      }),
      counters[counter]
    );
  }

  updateDropdown(dropdown);
}
