// function openList(list) {
//   list.classList.add('expandable-checkbox-list_opened');
// }

// function closeList(list) {
//   list.classList.remove('expandable-checkbox-list_opened');
// }

function handleClick(event) {
  if (event.target.closest('.expandable-checkbox-list__heading')) {
    // const lists = document.querySelectorAll('.expandable-checkbox-list');
    const currentList = event.currentTarget;
    currentList.classList.toggle('expandable-checkbox-list_opened');
  }
}

const lists = document.querySelectorAll('.expandable-checkbox-list');

lists.forEach((list) => {
  list.addEventListener('click', handleClick);
});
