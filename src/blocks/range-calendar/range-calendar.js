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

function printMomentDate(date) {
  console.log(date.format('YYYY-MM-DD'));
}

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

function getFirstDayOfMonth(date) {
  const momentDate = moment(date);
  return momentDate.startOf('month');
}

function getLastDayOfMonth(date) {
  const momentDate = moment(date);
  return momentDate.endOf('month');
}

function fillDaysPrefix(date, monthDays) {
  const momentDate = moment(date);
  const firstWeekdayOfMonth = getFirstWeekdayOfMonth(date);
  const lastDayOfPreviousMonth = getLastDayOfMonth(
    momentDate.subtract(1, 'months')
  );
  const currentPrefixDay = lastDayOfPreviousMonth.subtract(
    firstWeekdayOfMonth - 2,
    'days'
  );
  for (let i = 1; i < firstWeekdayOfMonth; i++) {
    monthDays.push(moment(currentPrefixDay));
    currentPrefixDay.add(1, 'days');
  }

  return monthDays;
}

function fillDaysBody(date, monthDays) {
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const lastDayOfMonth = getLastDayOfMonth(date);
  let curDay = firstDayOfMonth;
  while (curDay < lastDayOfMonth) {
    monthDays.push(moment(curDay));
    curDay.add(1, 'days');
  }
  return monthDays;
}

function fillDaysSuffix(date, monthDays) {
  const momentDate = moment(date);
  const lengthOfSuffix = 42 - monthDays.length;
  const firstDayOfNextMonth = getFirstDayOfMonth(momentDate.add(1, 'months'));
  const lastSuffixDay = moment(firstDayOfNextMonth).add(
    lengthOfSuffix - 1,
    'days'
  );
  const curDay = firstDayOfNextMonth;
  while (curDay <= lastSuffixDay) {
    monthDays.push(moment(curDay));
    curDay.add(1, 'days');
  }
  return monthDays;
}

function fillDays(date, monthDays) {
  monthDays = fillDaysPrefix(date, monthDays);
  monthDays = fillDaysBody(date, monthDays);
  monthDays = fillDaysSuffix(date, monthDays);
  return monthDays;
}

function colorDaysUnits(calendar, monthDays) {}

function highlightCurrentDay(calendar) {}

function printMonthDays(monthDays) {
  monthDays.forEach((monthDay) => {
    console.log(monthDay.format('YYYY-MM-DD'));
  });
}

function getDayNumberFromMomentDate(momentDate) {
  return momentDate.format('D');
}

function updateDays(calendar, date) {
  let monthDays = [];
  monthDays = fillDays(date, monthDays);
  const dayUnitBtns = calendar.querySelectorAll('.day-unit-btn');
  let dayUnitBtnsCount = 0;
  dayUnitBtns.forEach((dayUnitBtn) => {
    dayUnitBtn.innerHTML = getDayNumberFromMomentDate(
      monthDays[dayUnitBtnsCount]
    );
    dayUnitBtn.dataset.dateValue =
      monthDays[dayUnitBtnsCount].format('YYYY-MM-DD');
    dayUnitBtnsCount++;
  });
}

function updateMonthAttribute(calendar, value) {
  calendar.dataset.month = value;
}

function updateCalendar(calendar, date) {
  const momentDate = moment(date);
  updateMonthLabel(calendar, momentDate.format('MMMM') + ' ');
  updateYearLabel(calendar, momentDate.format('YYYY'));
  updateDays(calendar, date);
  // updateMonthAttribute(calendar, momentDate.format('YYYY-MM'));
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
    const currentDate = new Date(Date.parse(calendar.dataset.month));
    if (event.target.closest('.range-calendar__previous-month-btn')) {
      const newDate = subtractMonthsFromDate(currentDate, 1);
      // updateDateAttribute(calendar, moment(newDate).format('YYYY-MM-DD'));
      updateCalendar(calendar, newDate);
    } else {
      const newDate = addMonthsToDate(currentDate, 1);
      // updateDateAttribute(calendar, moment(newDate).format('YYYY-MM-DD'));
      updateCalendar(calendar, newDate);
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
// calendars.forEach((calendar) => {
//   calendar.addEventListener('click', handleSwitchMonthBtnClick);
// });
