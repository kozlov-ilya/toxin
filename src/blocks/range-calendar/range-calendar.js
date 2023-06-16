import moment from 'moment';

/* Locale settings */
moment.locale('ru');
moment.updateLocale('ru', {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
});

function updateMonthLabel(calendar, newMonthLabel) {
  const monthLabel = calendar.querySelector('.range-calendar__month-label');
  monthLabel.innerHTML = newMonthLabel;
}

function updateYearLabel(calendar, newYearLabel) {
  const yearLabel = calendar.querySelector('.range-calendar__year-label');
  yearLabel.innerHTML = newYearLabel;
}

function getDateYearAndMonth(date) {
  const momentDate = moment(date);
  return moment(new Date(momentDate.format('YYYY-MM')));
}

function getFirstWeekdayOfMonth(date) {
  return getDateYearAndMonth(date).isoWeekday();
}

function getLastDayOfMonth(date) {
  const momentDate = moment(date);
  return parseInt(momentDate.endOf('month').format('DD'));
}

function fillDaysPrefix(date, monthDays) {
  const momentDate = moment(date);
  const firstWeekdayOfCurrentMonth = getFirstWeekdayOfMonth(currentDate);
  const lastDayOfPreviousMonth = getLastDayOfMonth(
    momentDate.subtract(1, 'month')
  );
  for (let i = 1; i < firstWeekdayOfCurrentMonth; i++) {
    monthDays.array.push(
      lastDayOfPreviousMonth - (firstWeekdayOfCurrentMonth - 1 - i)
    );
  }
  monthDays.prefix = firstWeekdayOfCurrentMonth - 1;
  return monthDays;
}

function fillDaysBody(date, monthDays) {
  const lastDayOfCurrentMonth = getLastDayOfMonth(date);
  for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
    monthDays.array.push(i);
  }
  monthDays.body = lastDayOfCurrentMonth;
  return monthDays;
}

function fillDaysSuffix(monthDays) {
  monthDays.suffix = 42 - monthDays.array.length;
  for (let i = 1; monthDays.array.length < 42; i++) {
    monthDays.array.push(i);
  }
  return monthDays;
}

function fillDays(date, monthDays) {
  monthDays = fillDaysPrefix(date, monthDays);
  monthDays = fillDaysBody(date, monthDays);
  monthDays = fillDaysSuffix(monthDays);
  return monthDays;
}

function updateDays(calendar, date) {
  let monthDays = { array: [], prefix: 0, body: 0, suffix: 0 };
  monthDays = fillDays(date, monthDays);
  const dayBtns = calendar.querySelectorAll('.day-unit-btn');
  let countDayBtns = 0;
  dayBtns.forEach((dayBtn) => {
    dayBtn.innerHTML = monthDays.array[countDayBtns];
    countDayBtns++;
  });
}

function updateDateAttribute(calendar, value) {
  calendar.dataset.date = value;
}

function updateCalendar(calendar, date) {
  const momentDate = moment(date);
  updateMonthLabel(calendar, momentDate.format('MMMM') + ' ');
  updateYearLabel(calendar, momentDate.format('YYYY'));
  updateDays(calendar, date);
  updateDateAttribute(calendar, momentDate.format('YYYY-MM-DD'));
}

function subtractMonthsFromDate(date, months) {
  date.setMonth(date.getMonth() - months);
  return date;
}

function addMonthsToDate(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

function handleSwitchMonthBtnClick(event) {
  const calendar = event.currentTarget;
  if (event.target.closest('.switch-month-btn')) {
    const currentDate = new Date(Date.parse(calendar.dataset.date));
    if (event.target.closest('.range-calendar__previous-month-btn')) {
      const newDate = subtractMonthsFromDate(currentDate, 1);
      updateDateAttribute(calendar, moment(newDate).format('YYYY-MM-DD'));
    } else {
      const newDate = addMonthsToDate(currentDate, 1);
      updateDateAttribute(calendar, moment(newDate).format('YYYY-MM-DD'));
    }
  }
}

/* Initialize calendars with default values */
const calendars = document.querySelectorAll('.range-calendar');

const currentDate = new Date();
const defaultDate = currentDate;

calendars.forEach((calendar) => {
  updateCalendar(calendar, defaultDate);
});

/* Set event handlers */
calendars.forEach((calendar) => {
  calendar.addEventListener('click', handleSwitchMonthBtnClick);
});
