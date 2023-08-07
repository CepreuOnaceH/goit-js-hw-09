import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function addZero(value) {
  return String(value).padStart(2, '0');
}

function showTime({ days, hours, minutes, seconds }) {
  const daysQuantity = document.querySelector('[data-days]');
  const hoursQuantity = document.querySelector('[data-hours]');
  const minutesQuantity = document.querySelector('[data-minutes]');
  const secondsQuantity = document.querySelector('[data-seconds]');

  daysQuantity.textContent = addZero(days);
  hoursQuantity.textContent = addZero(hours);
  minutesQuantity.textContent = addZero(minutes);
  secondsQuantity.textContent = addZero(seconds);
}

function selectDate() {
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    document.querySelector('button[data-start]').disabled = true;
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    document.querySelector('button[data-start]').disabled = false;
  }
}
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  defaultDate: new Date(),
  onClose: selectDate,
});
document
  .querySelector('#datetime-picker')
  .addEventListener('change', selectDate);
document.querySelector('button[data-start]').addEventListener('click', () => {
  document.querySelector('button[data-start]').disabled = true;
  document.querySelector('button[data-reset]').disabled = false;
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );

  const countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const difference = selectedDate - currentTime;

    if (difference <= 0) {
      clearInterval(countdownInterval);
      showTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      showTime(convertMs(difference));
    }
  }, 1000);
  document.querySelector('button[data-reset]').addEventListener('click', () => {
    clearInterval(countdownInterval);
    showTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    document.querySelector('#datetime-picker').disabled = false;
    document.querySelector('button[data-start]').disabled = false;
    document.querySelector('button[data-reset]').disabled = true;
  });
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
