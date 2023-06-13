import '../date-dropdown/date-dropdown';
import '../range-calendar/range-calendar';

function handleDatePickerSelectClick(event) {
  const datePickers = document.querySelectorAll('.date-range-picker');

  if (event.target.closest('.date-dropdown')) {
    let datePicker = event.target.closest('.date-range-picker');

    /* Hide others date picker's poups */
    datePickers.forEach((e) => {
      if (!e.isEqualNode(datePicker))
        e.classList.remove('date-range-picker_opened');
    });

    /* Show clicked date picker's poups */
    datePicker.classList.add('date-range-picker_opened');

    return;
  }

  if (!event.target.closest('.date-range-picker__popup')) {
    datePickers.forEach((e) => {
      e.classList.remove('date-range-picker_opened');
    });
  }
}

document.addEventListener('click', handleDatePickerSelectClick);
