const counters = document.querySelectorAll('.counter');

export function getValue(counter) {
  return parseInt(counter.dataset.value);
}

export function getLabel(counter) {
  return counter.querySelector('.counter__label').textContent;
}

function updateValueView(counter) {
  counter.querySelector('.counter__value').textContent = counter.dataset.value;
}

export function setValue(counter, newValue) {
  counter.dataset.value = newValue;
  updateValueView(counter);
}

export function setLabel(counter, newLabel) {
  counter.querySelector('.counter__label').textContent = newLabel;
}

function increaseValue(counter) {
  let oldValue = getValue(counter);
  let newValue = oldValue + 1;
  setValue(counter, newValue);
}

function decreaseValue(counter) {
  let oldValue = getValue(counter);
  let newValue = oldValue - 1;
  setValue(counter, newValue);
}

function disableButton(button) {
  button.setAttribute('disabled', '');
  button.classList.add('counter__button_disabled');
}

function enableButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove('counter__button_disabled');
}

function isValueZero(counter) {
  return getValue(counter) == 0;
}

function updateAbilityToDecreaseValue(counter) {
  let decreasingButton = counter.querySelector('.counter__button_decreasing');
  if (isValueZero(counter)) {
    disableButton(decreasingButton);
  } else {
    enableButton(decreasingButton);
  }
}

export function resetCounter(counter) {
  setValue(counter, 0);
  updateAbilityToDecreaseValue(counter);
}

function handleButtonClick(event) {
  const counter = event.target.closest('.counter');
  if (event.target.closest('.counter__button_decreasing')) {
    decreaseValue(counter);
    updateAbilityToDecreaseValue(counter);
  } else {
    increaseValue(counter);
    updateAbilityToDecreaseValue(counter);
  }
}

counters.forEach((counter) => {
  let buttons = counter.querySelectorAll('.counter__button');

  updateValueView(counter);
  updateAbilityToDecreaseValue(counter);

  buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  });
});
