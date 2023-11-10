// Завдання 1 - перемикач кольорів
// Виконуй це завдання у файлах 01 - color - switcher.html і 01 - color - switcher.js.Подивися демо - відео роботи перемикача.
//     https://user-images.githubusercontent.com/17479434/127716753-fabd276f-6a7d-411b-bfa2-01c818f4ea66.mp4
// HTML містить кнопки «Start» і «Stop».
/*
<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>
*/
// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
// Для генерування випадкового кольору використовуй функцію getRandomHexColor.
/*---------------------------------------------------------------------------*/

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartSwitherClick);
refs.stopBtn.setAttribute('disabled', 'disabled');
let timerId = null;
// let switcherIsActive = false;

function onStartSwitherClick() {
  // if (switcherIsActive) {
  //   return;
  // }
  timerId = setInterval(switchBodyColor, 1000);
  // switcherIsActive = true;
  refs.startBtn.removeEventListener('click', onStartSwitherClick);
  refs.stopBtn.addEventListener('click', onStopSwitherClick);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStopSwitherClick() {
  clearInterval(timerId);
  // switcherIsActive = false;
  refs.startBtn.addEventListener('click', onStartSwitherClick);
  refs.stopBtn.removeEventListener('click', onStopSwitherClick);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function switchBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
