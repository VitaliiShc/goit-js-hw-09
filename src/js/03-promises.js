// Завдання 3 - генератор промісів
// Виконуй це завдання у файлах 03-promises.html і 03-promises.js. Подивися демо-відео роботи генератора промісів.
// https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4
// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах, крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.
/*
<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>
*/

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

/*
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
*/

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

/*
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
*/

// Бібліотека повідомлень
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.
// Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix (https://github.com/notiflix/Notiflix#readme).

/*-------------------------------------------------------------*/

import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();

  const delayInit = Number(e.currentTarget.delay.value);
  const stepInit = Number(e.currentTarget.step.value);
  const amountInit = Number(e.currentTarget.amount.value);

  if (delayInit < 0 || stepInit < 0) {
    Notiflix.Notify.warning(`Please enter a positive number of delays`);
  } else if (amountInit <= 0) {
    Notiflix.Notify.warning(`I can't promise anything`);
  } else {
    for (let i = 1; i <= amountInit; i += 1) {
      let delaySum = delayInit + stepInit * (i - 1);
      createPromise(i, delaySum)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

Notiflix.Notify.init({
  width: '360px',
  position: 'center-top',
  distance: '100px',
  fontSize: '28px',
});
