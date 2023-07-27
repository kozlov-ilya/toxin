const roomLabels = document.querySelectorAll(".room-label");

function addSpacesToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getRoomPrice(roomLabel) {
  return parseInt(roomLabel.dataset.price);
}

function addPriceToHTML(roomLabel) {
  const roomPrice = getRoomPrice(roomLabel);
  const roomPriceValueElem = roomLabel.querySelector(
    ".room-label__room-price-value"
  );
  roomPriceValueElem.textContent = `${addSpacesToNumber(roomPrice)}₽ `;
}

roomLabels.forEach((roomLabel) => {
  addPriceToHTML(roomLabel);
});
