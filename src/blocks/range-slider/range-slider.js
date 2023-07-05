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
  return thumb.dataset.value;
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
  const sliderMinValue = slider.dataset.minValue;
  const sliderMaxValue = slider.dataset.maxValue;
  const valueRange = sliderMaxValue - sliderMinValue;
  return ((thumbValue - sliderMinValue) / valueRange) * track.width;
}
function convertXToThumbValue(x, slider) {
  const track = getTrack(slider);
  const sliderMinValue = slider.dataset.minValue;
  const sliderMaxValue = slider.dataset.maxValue;
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

function handleThumbMousedown(event) {
  if (event.target.closest('.slider-thumb')) {
    const rangeSlider = event.currentTarget;
    const slider = rangeSlider.querySelector('.slider');
    const thumb = event.target.closest('.slider-thumb');
    const thumbWidth = thumb.offsetWidth;

    function dragThumb(event) {
      let cursorRelX = getCursorRelX(event, slider);
      cursorRelX = limitCursorRelX(cursorRelX, slider, thumbWidth);
      const thumbValue = convertXToThumbValue(
        cursorRelX - thumbWidth / 2,
        slider
      );
      setThumbValue(thumb, thumbValue);
      setThumbX(thumb, cursorRelX - thumbWidth / 2);
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
  rangeSlider.addEventListener('mousedown', handleThumbMousedown);
});
