export function closeDropdown(dropdown) {
  dropdown.classList.remove('dropdown_opened');
}

function handleClick(event) {
  const dropdowns = document.querySelectorAll('.dropdown');

  if (event.target.closest('.dropdown__select')) {
    /* Dropdown select was clicked */
    let dropdownSelect = event.target.closest('.dropdown__select');
    let dropdown = dropdownSelect.closest('.dropdown');
    /* Close all dropdowns except clicked */
    dropdowns.forEach((dropdown) => {
      if (!dropdown.isEqualNode(dropdown)) {
        closeDropdown(dropdown);
      }
    });
    /* Toggle clicked dropdown */
    dropdown.classList.toggle('dropdown_opened');
    return;
  }

  if (!event.target.closest('.dropdown__menu')) {
    /* If clicked outside of a dropdown menu - close all dropdowns */
    dropdowns.forEach((dropdown) => {
      closeDropdown(dropdown);
    });
  }
}

document.addEventListener('click', handleClick);
