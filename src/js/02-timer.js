import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const fp = flatpickr(refs.input, options);

refs.startBtn.setAttribute("disabled", "true");
let chosenDate = Date.now();

function onClose(selectedDates) {    
    if (selectedDates[0] < options.defaultDate) {
        return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute("disabled");
      chosenDate = selectedDates[0];
    }
}

let timerId = null;

const onStartBtn = () => {
  refs.startBtn.setAttribute("disabled", "true");
  refs.input.setAttribute("disabled", "true");
  timerId = setInterval(() => {
    const resultTime = convertMs(chosenDate - Date.now());
       
    const deltaTime = chosenDate - Date.now();
    if (deltaTime <= 0 ) {
      clearInterval(timerId);
      return;
  }
     markupChange(resultTime); 
  }, 1000);
    
}

refs.startBtn.addEventListener('click', onStartBtn);

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

function markupChange({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}