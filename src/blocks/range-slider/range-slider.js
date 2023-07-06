const rangeSliders = document.querySelectorAll('.range-slider');

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

function getOffsetX(el) {
  return getOffset(el).left;
}

function getThumbValue(thumb) {
  return parseInt(thumb.dataset.value);
}

function getThumbs(slider) {
  const minThumb = slider.querySelector('.slider__thumb-min');
  const maxThumb = slider.querySelector('.slider__thumb-max');

  const minThumbValue = getThumbValue(minThumb);
  const maxThumbValue = getThumbValue(maxThumb);

  return {
    min: { el: minThumb, value: minThumbValue },
    max: { el: maxThumb, value: maxThumbValue },
  };
}

function getTrack(slider) {
  const track = slider.querySelector('.slider__track');
  const trackX = getOffsetX(track);
  const trackWidth = track.offsetWidth - 12;
  return { x: trackX, width: trackWidth };
}

function getThumbRelX(thumb, track) {
  const thumbX = getOffsetX(thumb);
  return thumbX - track.x;
}

function setThumbX(thumb, x) {
  thumb.style.left = x + 'px';
}

function convertThumbValueToX(thumbObj, slider) {
  const track = getTrack(slider);
  const thumbValue = thumbObj.value;
  const sliderMinValue = parseInt(slider.dataset.minValue);
  const sliderMaxValue = parseInt(slider.dataset.maxValue);
  const valueRange = sliderMaxValue - sliderMinValue;
  return ((thumbValue - sliderMinValue) / valueRange) * track.width;
}
function convertXToThumbValue(x, slider) {
  const track = getTrack(slider);
  const sliderMinValue = parseInt(slider.dataset.minValue);
  const sliderMaxValue = parseInt(slider.dataset.maxValue);
  const valueRange = sliderMaxValue - sliderMinValue;
  return (valueRange / track.width) * x;
}

function positionThumbs(slider) {
  const thumbs = getThumbs(slider);
  const minThumbX = convertThumbValueToX(thumbs.min, slider);
  const maxThumbX = convertThumbValueToX(thumbs.max, slider);
  setThumbX(thumbs.min.el, minThumbX);
  setThumbX(thumbs.max.el, maxThumbX);
}

function getCursorRelX(event, slider) {
  const track = getTrack(slider);
  const cursorX = event.pageX;
  return cursorX - track.x;
}

function setThumbValue(thumb, value) {
  thumb.dataset.value = value;
}

function limitCursorRelX(cursorRelX, slider, thumbWidth) {
  const track = getTrack(slider);
  const minX = 0 + thumbWidth / 2;
  const maxX = track.width + thumbWidth / 2;
  cursorRelX = cursorRelX < minX ? minX : cursorRelX;
  cursorRelX = cursorRelX > maxX ? maxX : cursorRelX;
  return cursorRelX;
}

function switchThumbsClasses(slider) {
  const thumbs = getThumbs(slider);
  if (thumbs.min.value > thumbs.max.value) {
    thumbs.min.el.classList.remove('slider__thumb-min');
    thumbs.min.el.classList.add('slider__thumb-max');
    thumbs.max.el.classList.remove('slider__thumb-max');
    thumbs.max.el.classList.add('slider__thumb-min');
  }
}

function drawTrackRange(slider) {
  const track = getTrack(slider);
  const thumbs = getThumbs(slider);
  const trackRange = slider.querySelector('.slider__track-range');
  const minThumbRelX = getThumbRelX(thumbs.min.el, track);
  const maxThumbRelX = getThumbRelX(thumbs.max.el, track);
  const trackRangeWidth =
    maxThumbRelX - minThumbRelX + thumbs.max.el.offsetWidth / 2;
  trackRange.style.left = minThumbRelX + 'px';
  trackRange.style.width = trackRangeWidth + 'px';
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateRangeLabel(rangeSlider) {
  const rangeLabel = rangeSlider.querySelector('.form-unit__subtitle');
  const slider = rangeSlider.querySelector('.slider');
  const thumbs = getThumbs(slider);
  const rangeMinValue = numberWithSpaces(thumbs.min.value);
  const rangeMaxValue = numberWithSpaces(thumbs.max.value);
  const rangeLabelValue = `${rangeMinValue}₽ - ${rangeMaxValue}₽`;
  rangeLabel.innerHTML = rangeLabelValue;
}

function handleThumbMousedown(event) {
  if (event.target.closest('.slider-thumb')) {
    const rangeSlider = event.currentTarget;
    const slider = rangeSlider.querySelector('.slider');
    const thumb = event.target.closest('.slider-thumb');
    const thumbWidth = thumb.offsetWidth;

    function dragThumb(event) {
      let cursorRelX = getCursorRelX(event, slider);
      cursorRelX = limitCursorRelX(cursorRelX, slider, thumbWidth);
      const newThumbX = cursorRelX - thumbWidth / 2;
      let newThumbValue = convertXToThumbValue(newThumbX, slider);
      setThumbValue(thumb, newThumbValue);
      positionThumbs(slider);
      switchThumbsClasses(slider);
      drawTrackRange(slider);
      updateRangeLabel(rangeSlider);
    }

    document.addEventListener('mousemove', dragThumb);

    function handleThumbMouseup(event) {
      document.removeEventListener('mousemove', dragThumb);
    }
    document.addEventListener('mouseup', handleThumbMouseup);
  }
}

rangeSliders.forEach((rangeSlider) => {
  const slider = rangeSlider.querySelector('.slider');
  const track = getTrack(slider);
  const thumbs = getThumbs(slider);
  positionThumbs(slider);
  drawTrackRange(slider);
  updateRangeLabel(rangeSlider);
  rangeSlider.addEventListener('mousedown', handleThumbMousedown);

  slider.ondragstart = function () {
    return false;
  };
});
