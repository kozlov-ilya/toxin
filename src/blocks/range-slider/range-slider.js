const rangeSliders = document.querySelectorAll('.range-slider');

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

function handleThumbMousedown(event) {
  const thumb = event.currentTarget;
  const thumbWidth = thumb.offsetWidth;

  const track = thumb.closest('.slider').querySelector('.slider__track');
  const trackOffset = getOffset(track);
  const trackWidth = track.offsetWidth;

  function dragThumb(event) {
    const maxLeftPos = trackWidth - thumbWidth;
    let relCursorPos = event.pageX - trackOffset.left - thumbWidth / 2;
    relCursorPos = relCursorPos < 0 ? 0 : relCursorPos;
    relCursorPos = relCursorPos > maxLeftPos ? maxLeftPos : relCursorPos;
    thumb.style.left = relCursorPos + 'px';
  }

  document.addEventListener('mousemove', dragThumb);

  function handleThumbMouseup(event) {
    console.log('Mouseup!');
    document.removeEventListener('mousemove', dragThumb);
  }

  thumb.addEventListener('mouseup', handleThumbMouseup);
}

rangeSliders.forEach((rangeSlider) => {
  const slider = rangeSlider.querySelector('.slider');
  const track = slider.querySelector('.slider__track');
  const minThumb = slider.querySelector('.slider__thumb_min');
  const maxThumb = slider.querySelector('.slider__thumb_max');

  minThumb.addEventListener('mousedown', handleThumbMousedown);
});
