const rangeSliders = document.querySelectorAll('.range-slider');
const thumbWidth = 12;

rangeSliders.forEach((rangeSlider) => {
  setRangeSliderHandlers(rangeSlider);
  initThumbsPos(rangeSlider);
  updateTrackRange(rangeSlider);
  updateRangeLabel(rangeSlider);
});

function setRangeSliderHandlers(slider) {
  slider.addEventListener('mousedown', handleRangeSliderThumbPickup);
  slider.addEventListener('touchstart', handleRangeSliderThumbPickup);
}

function handleRangeSliderThumbPickup(event) {
  if (!event.target.closest('.range-slider-thumb')) {
    return;
  }

  const slider = event.currentTarget;
  const curThumb = event.target.closest('.range-slider-thumb');

  document.addEventListener('mousemove', dragThumb);
  document.addEventListener('touchmove', dragThumb);

  function dragThumb(event) {
    let thumbLeftPos = calcThumbLeftPos(event, slider);
    updateThumbCondition(curThumb, thumbLeftPos, slider);
    if (isThumbsSwitchNeeded(slider)) {
      switchThumbs(slider);
    }
    updateTrackRange(slider);
    updateRangeLabel(slider);
  }

  document.addEventListener('mouseup', handleRangeSliderThumbPutdown);
  document.addEventListener('touchend', handleRangeSliderThumbPutdown);

  function handleRangeSliderThumbPutdown(event) {
    document.removeEventListener('mousemove', dragThumb);
    document.removeEventListener('touchmove', dragThumb);
  }
}

function switchThumbs(slider) {
  const thumbs = getThumbs(slider);
  const minThumb = thumbs.min.elem;
  const maxThumb = thumbs.max.elem;

  minThumb.classList.remove('range-slider__thumb-min');
  minThumb.classList.add('range-slider__thumb-max');
  maxThumb.classList.remove('range-slider__thumb-max');
  maxThumb.classList.add('range-slider__thumb-min');
}

function isThumbsSwitchNeeded(slider) {
  const thumbs = getThumbs(slider);

  return thumbs.min.value > thumbs.max.value;
}

function updateRangeLabel(slider) {
  const rangeLabel = slider.querySelector('.range-slider__range-label');
  const thumbs = getThumbs(slider);

  const minThumbValueText = numberWithSpaces(thumbs.min.value);
  const maxThumbValueText = numberWithSpaces(thumbs.max.value);
  const rangeLabelText = `${minThumbValueText}₽ - ${maxThumbValueText}₽`;

  rangeLabel.textContent = rangeLabelText;
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateTrackRange(slider) {
  const trackRangeElem = slider.querySelector('.range-slider__track-range');
  const thumbs = getThumbs(slider);

  const minThumbLeft = convertThumbValueToLeftPos(thumbs.min.value, slider);
  const maxThumbLeft = convertThumbValueToLeftPos(thumbs.max.value, slider);

  trackRangeElem.style.left = minThumbLeft + 'px';
  trackRangeElem.style.width =
    maxThumbLeft - minThumbLeft + thumbWidth / 2 + 'px';
}

function updateThumbCondition(thumb, left, slider) {
  setThumbLeftPos(thumb, left);
  updateThumbValueAttribute(thumb, left, slider);
}

function initThumbsPos(slider) {
  const thumbs = getThumbs(slider);

  setThumbLeftPos(
    thumbs.min.elem,
    convertThumbValueToLeftPos(thumbs.min.value, slider)
  );
  setThumbLeftPos(
    thumbs.max.elem,
    convertThumbValueToLeftPos(thumbs.max.value, slider)
  );
}

function updateThumbValueAttribute(thumb, left, slider) {
  thumb.dataset.value = convertLeftPosToThumbValue(left, slider);
}

function convertLeftPosToThumbValue(left, slider) {
  const track = getRangeSliderTrack(slider);
  const valueLimits = getRangeValueLimits(slider);

  const totalRangeSize = valueLimits.max - valueLimits.min;

  return ((left + thumbWidth / 2) / track.width) * totalRangeSize;
}

function convertThumbValueToLeftPos(value, slider) {
  const track = getRangeSliderTrack(slider);
  const valueLimits = getRangeValueLimits(slider);

  const totalRangeSize = valueLimits.max - valueLimits.min;
  const curRangeSize = value - valueLimits.min;

  return (curRangeSize / totalRangeSize) * track.width - thumbWidth / 2;
}

function getRangeValueLimits(slider) {
  const min = slider.dataset.minValue;
  const max = slider.dataset.maxValue;

  return { min, max };
}

function getThumbs(slider) {
  const minThumb = slider.querySelector('.range-slider__thumb-min');
  const maxThumb = slider.querySelector('.range-slider__thumb-max');

  const minThumbValue = getThumbValue(minThumb);
  const maxThumbValue = getThumbValue(maxThumb);

  return {
    min: { elem: minThumb, value: minThumbValue },
    max: { elem: maxThumb, value: maxThumbValue },
  };
}

function getThumbValue(thumb) {
  return parseInt(thumb.dataset.value);
}

function setThumbLeftPos(thumb, left) {
  thumb.style.left = left + 'px';
}

function calcThumbLeftPos(event, slider) {
  const cursorRelPos = getCursorRelPos(event, slider);
  const track = getRangeSliderTrack(slider);
  let thumbLeftPos;

  const minLeft = 0;
  const maxLeft = track.width;

  if (cursorRelPos.left < minLeft) {
    thumbLeftPos = minLeft;
  } else if (cursorRelPos.left > maxLeft) {
    thumbLeftPos = maxLeft;
  } else {
    thumbLeftPos = cursorRelPos.left;
  }

  thumbLeftPos -= thumbWidth / 2;

  return thumbLeftPos;
}

function getCursorRelPos(event, slider) {
  const cursorAbsPos = getCursorAbsPos(event);
  const track = getRangeSliderTrack(slider);
  const trackAbsPos = track.pos;

  const left = cursorAbsPos.left - trackAbsPos.left;
  const top = cursorAbsPos.top - trackAbsPos.top;

  return { left, top };
}

function getRangeSliderTrack(slider) {
  const track = slider.querySelector('.range-slider__track');
  const trackPos = getElementAbsPos(track);
  const trackWidth = track.offsetWidth;
  return { pos: { left: trackPos.left, top: trackPos.top }, width: trackWidth };
}

function getCursorAbsPos(event) {
  let left;
  let top;

  if (event.pageX !== undefined) {
    left = event.pageX;
    top = event.pageY;
  } else {
    left = event.changedTouches[0].pageX;
    top = event.changedTouches[0].pageY;
  }

  return { left, top };
}

function getElementAbsPos(element) {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

export function getRangeSliderValues(slider) {
  const thumbs = getThumbs(slider);
  return { min: thumbs.min.value, max: thumbs.max.value };
}
