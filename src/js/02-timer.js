
'use strict';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startTimeBtnEl = document.querySelector('button[data-start]');
const daysSpanEl = document.querySelector('span[data-days]');
const hoursSpanEl = document.querySelector('span[data-hours]');
const minutesSpanEl = document.querySelector('span[data-minutes]');
const secondsSpanEl = document.querySelector('span[data-seconds]');

let timeId = null;
let userDate = null;
startTimeBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
          Notiflix.Notify.failure('Please choose a date in the future');
      } else {
          startTimeBtnEl.disabled = false;
      }
      userDate = selectedDates[0];
    },
  };

  flatpickr(inputEl, options);


  startTimeBtnEl.addEventListener('click', startTimer);

  function startTimer() {
      timeId = setInterval(() => {
          const di = userDate - new Date();
          if (di <= 0) {
              clearInterval(timeId);
              return;
          }
          setTimeSpan()
      }, 1000);
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function pad(value) {
    return String(value).padStart(2, '0');
}

function setTimeSpan() {
    const {days, hours, minutes, seconds} = convertMs(userDate - new Date());
    daysSpanEl.textContent = pad(days);
    hoursSpanEl.textContent = pad(hours);
    minutesSpanEl.textContent = pad(minutes);
    secondsSpanEl.textContent = pad(seconds);
}