import moment from "moment";

/* Locale settings */
moment.locale("ru");
moment.updateLocale("ru", {
  months: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
});

/* Variables */
const currentDate = new Date();
const defaultDate = currentDate;

/* Functions */
function updateMonthLabel(calendar, newMonthLabel) {
  const monthLabel = calendar.querySelector(".range-calendar__month-label");
  monthLabel.innerHTML = newMonthLabel;
}

function updateYearLabel(calendar, newYearLabel) {
  const yearLabel = calendar.querySelector(".range-calendar__year-label");
  yearLabel.innerHTML = newYearLabel;
}

function getDateYearAndMonth(date) {
  const momentDate = moment(date);
  return moment(new Date(momentDate.format("YYYY-MM")));
}

function getFirstWeekdayOfMonth(date) {
  return getDateYearAndMonth(date).isoWeekday();
}

function getFirstDayOfMonth(date) {
  const momentDate = moment(date);
  return momentDate.startOf("month");
}

function getLastDayOfMonth(date) {
  const momentDate = moment(date);
  return momentDate.endOf("month");
}

function fillDaysPrefix(date, monthDays) {
  const momentDate = moment(date);
  const firstWeekdayOfMonth = getFirstWeekdayOfMonth(date);
  const lastDayOfPreviousMonth = getLastDayOfMonth(
    momentDate.subtract(1, "months")
  );
  const currentPrefixDay = lastDayOfPreviousMonth.subtract(
    firstWeekdayOfMonth - 2,
    "days"
  );
  for (let i = 1; i < firstWeekdayOfMonth; i++) {
    monthDays.push(moment(currentPrefixDay));
    currentPrefixDay.add(1, "days");
  }

  return monthDays;
}

function fillDaysBody(date, monthDays) {
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const lastDayOfMonth = getLastDayOfMonth(date);
  let curDay = firstDayOfMonth;
  while (curDay < lastDayOfMonth) {
    monthDays.push(moment(curDay));
    curDay.add(1, "days");
  }
  return monthDays;
}

function fillDaysSuffix(date, monthDays) {
  const momentDate = moment(date);
  const lengthOfSuffix = 42 - monthDays.length;
  const firstDayOfNextMonth = getFirstDayOfMonth(momentDate.add(1, "months"));
  const lastSuffixDay = moment(firstDayOfNextMonth).add(
    lengthOfSuffix - 1,
    "days"
  );
  const curDay = firstDayOfNextMonth;
  while (curDay <= lastSuffixDay) {
    monthDays.push(moment(curDay));
    curDay.add(1, "days");
  }
  return monthDays;
}

function fillDays(date, monthDays) {
  monthDays = fillDaysPrefix(date, monthDays);
  monthDays = fillDaysBody(date, monthDays);
  monthDays = fillDaysSuffix(date, monthDays);
  return monthDays;
}

function colorDaysUnits(calendar, month) {
  const dayUnitBtns = calendar.querySelectorAll(".day-unit-btn");
  dayUnitBtns.forEach((dayUnitBtn) => {
    dayUnitBtn.classList.remove("day-unit-btn_color_secondary");
    if (moment(dayUnitBtn.dataset.dateValue).format("YYYY-MM") != month) {
      dayUnitBtn.classList.add("day-unit-btn_color_secondary");
    }
  });
}

function highlightCurrentDay(calendar) {
  const dayUnitBtns = calendar.querySelectorAll(".day-unit-btn");
  const currentMomentDate = moment().format("YYYY-MM-DD");
  dayUnitBtns.forEach((dayUnitBtn) => {
    dayUnitBtn.classList.remove("day-unit-btn_type_today");
    if (currentMomentDate == dayUnitBtn.dataset.dateValue) {
      dayUnitBtn.classList.add("day-unit-btn_type_today");
    }
  });
}

function getDayNumberFromMomentDate(momentDate) {
  return momentDate.format("D");
}

function updateDays(calendar, date) {
  let monthDays = [];
  monthDays = fillDays(date, monthDays);
  const dayUnitBtns = calendar.querySelectorAll(".day-unit-btn");
  let dayUnitBtnsCount = 0;
  dayUnitBtns.forEach((dayUnitBtn) => {
    dayUnitBtn.innerHTML = getDayNumberFromMomentDate(
      monthDays[dayUnitBtnsCount]
    );
    dayUnitBtn.dataset.dateValue =
      monthDays[dayUnitBtnsCount].format("YYYY-MM-DD");
    dayUnitBtnsCount++;
  });
  highlightCurrentDay(calendar);
  colorDaysUnits(calendar, moment(date).format("YYYY-MM"));
}

function updateMonthAttribute(calendar, value) {
  calendar.dataset.month = value;
}

function updateCalendar(calendar, date) {
  const momentDate = moment(date);
  updateMonthLabel(calendar, momentDate.format("MMMM") + " ");
  updateYearLabel(calendar, momentDate.format("YYYY"));
  updateDays(calendar, date);
  updateMonthAttribute(calendar, momentDate.format("YYYY-MM"));
}

function subtractMonthsFromDate(date, months) {
  date.setMonth(date.getMonth() - months);
  return date;
}

function addMonthsToDate(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

function colorCalendarRange(calendar) {
  const dateFrom = calendar.dataset.dateFrom;
  const dateTo = calendar.dataset.dateTo;
  const dayUnitBtns = calendar.querySelectorAll(".day-unit-btn");
  dayUnitBtns.forEach((dayUnitBtn) => {
    const dateValue = dayUnitBtn.dataset.dateValue;
    dayUnitBtn.classList.remove("day-unit-btn_clicked");
    dayUnitBtn.classList.remove("day-unit-btn_range_in");
    dayUnitBtn.classList.remove("day-unit-btn_range_from");
    dayUnitBtn.classList.remove("day-unit-btn_range_to");
    if (dateValue == dateFrom || dateValue == dateTo) {
      dayUnitBtn.classList.add("day-unit-btn_clicked");
    }
    if (dateTo) {
      if (dateValue > dateFrom && dateValue < dateTo) {
        dayUnitBtn.classList.add("day-unit-btn_range_in");
      }
      switch (dateValue) {
        case dateFrom:
          dayUnitBtn.classList.add("day-unit-btn_range_from");
          break;
        case dateTo:
          dayUnitBtn.classList.add("day-unit-btn_range_to");
          break;
      }
    }
  });
}

function resetCalendar(calendar) {
  calendar.dataset.dateFrom = "";
  calendar.dataset.dateTo = "";
  const dayUnitBtns = calendar.querySelectorAll(".day-unit-btn");
  dayUnitBtns.forEach((dayUnitBtn) => {
    dayUnitBtn.classList.remove("day-unit-btn_clicked");
    dayUnitBtn.classList.remove("day-unit-btn_range_in");
    dayUnitBtn.classList.remove("day-unit-btn_range_from");
    dayUnitBtn.classList.remove("day-unit-btn_range_to");
  });
}

/* Handlers */
function handleSwitchMonthBtnClick(event) {
  const calendar = event.currentTarget;
  if (event.target.closest(".switch-month-btn")) {
    const currentDate = new Date(Date.parse(calendar.dataset.month));
    if (event.target.closest(".range-calendar__previous-month-btn")) {
      const newDate = subtractMonthsFromDate(currentDate, 1);
      updateCalendar(calendar, newDate);
    } else {
      const newDate = addMonthsToDate(currentDate, 1);
      updateCalendar(calendar, newDate);
    }
  }
}

function handleDayUnitBtnClicked(event) {
  const calendar = event.currentTarget;
  const dateFrom = calendar.dataset.dateFrom;
  const dateTo = calendar.dataset.dateTo;

  if (event.target.closest(".day-unit-btn")) {
    const dayUnitBtn = event.target.closest(".day-unit-btn");
    const momentDate = dayUnitBtn.dataset.dateValue;
    if (dateFrom && !dateTo && momentDate > dateFrom) {
      calendar.dataset.dateTo = momentDate;
    } else {
      calendar.dataset.dateTo = "";
      calendar.dataset.dateFrom = momentDate;
    }
  }

  colorCalendarRange(calendar);
}

function handleClearButtonClicked(event) {
  const calendar = event.currentTarget;
  if (event.target.closest(".range-calendar__clear-button")) {
    resetCalendar(calendar);
  }
}

/* Initialize calendars with default values */
const calendars = document.querySelectorAll(".range-calendar");

calendars.forEach((calendar) => {
  updateCalendar(calendar, defaultDate);
  colorCalendarRange(calendar);
});

/* Set event handlers */
calendars.forEach((calendar) => {
  calendar.addEventListener("click", handleSwitchMonthBtnClick);
  calendar.addEventListener("click", handleDayUnitBtnClicked);
  calendar.addEventListener("click", handleClearButtonClicked);
});
