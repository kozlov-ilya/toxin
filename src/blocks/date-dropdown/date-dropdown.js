function handleDropdownSelectClick(event) {
  const dropdowns = document.querySelectorAll('.date-dropdown');

  if (event.target.closest('.date-dropdown__select')) {
    /* Dropdown select was clicked */
    let dropdownSelect = event.target;
    let dropdown = dropdownSelect.parentElement;
    /* Close all dropdowns except clicked */
    dropdowns.forEach((e) => {
      if (!e.isEqualNode(dropdown)) e.classList.remove('date-dropdown_opened');
    });
    /* Toggle clicked dropdown */
    dropdown.classList.toggle('date-dropdown_opened');
    return;
  }

  if (!event.target.closest('.date-dropdown__menu')) {
    /* If clicked outside of a dropdown menu - close all dropdowns */
    dropdowns.forEach((e) => {
      e.classList.remove('date-dropdown_opened');
    });
  }
}

document.addEventListener('click', handleDropdownSelectClick);
