// Завдання 2 - таймер зворотного відліку
// Виконуй це завдання у файлах 02-timer.html і 02-timer.js. Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
// https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4
// Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.

/*
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
*/

// Бібліотека flatpickr
// Використовуй бібліотеку flatpickr (https://flatpickr.js.org/) для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.

/*
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
*/

// Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.

/*
<input type="text" id="datetime-picker" />
*/

// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість в документації «Options» (https://flatpickr.js.org/options/), і використовуй його у своєму коді.

/*
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
*/

// Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.

// Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.

/*
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
*/

// Форматування часу
// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

// Бібліотека повідомлень
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.
// Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix(https://github.com/notiflix/Notiflix#readme).
/*----------------------------------------------------------- */

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import '../css/02-timer.css'

Notiflix.Notify.init({
  width: '360px',
  position: 'center-top',
  distance: '300px',
  fontSize: '28px',
});

Notiflix.Report.init({
  width: '360px',
  titleFontSize: '28px',
  buttonFontSize: '28px',
  backOverlay: false,
});

const refs = {
  deadline: document.querySelector('#datetime-picker'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let endTime = null;

refs.startBtn.disabled = true;
refs.stopBtn.disabled = true;

function startTimer() {
  Notiflix.Notify.success('The timer has started');
  let diffTime = endTime - Date.now();
  refs.deadline.disabled = true;
  refs.startBtn.disabled = true;
  refs.startBtn.removeEventListener('click', startTimer);
  refs.stopBtn.disabled = false;
  refs.stopBtn.addEventListener('click', stopTimer);

  intervalId = setInterval(() => {
    diffTime -= 1000;
    fillDeadlineDate(diffTime);
    if (diffTime < 1000) {
      clearInterval(intervalId);
      Notiflix.Report.info(
        'Your time is up',
        '',
        'Refresh Timer',
        function cb() {
          location.reload();
        }
      );
      refs.deadline.disabled = true;
        refs.stopBtn.disabled = true;
        refs.stopBtn.removeEventListener('click', stopTimer);
    }
  }, 1000);
}

function stopTimer() {
  location.reload();
}

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) <= Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.startBtn.disabled = true;
      flatpickr(refs.deadline, flatpickrOptions);
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', startTimer);
      endTime = Date.parse(selectedDates[0]);
    }
  },
};

flatpickr(refs.deadline, flatpickrOptions);

function fillDeadlineDate(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

/* ------------------------------------------ */

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
