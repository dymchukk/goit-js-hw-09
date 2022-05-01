import Notiflix from 'notiflix';
const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form').addEventListener('submit', onSubmit),
};

function onSubmit(event) {
  event.preventDefault();
  const enteredValues = {
    delay: parseInt(refs.delay.value),
    step: parseInt(refs.step.value),
    amount: parseInt(refs.amount.value),
  };
  createPromiseConditions(enteredValues);
}

function createPromiseConditions({ delay, step, amount }) {
  let totalDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
       Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += step;
  }
  let sumOfAllDaleys = 0;
  sumOfAllDaleys += totalDelay;

  setTimeout(() => {
    Notiflix.Notify.info(`All ${amount} promises were generated in ${sumOfAllDaleys}ms`);
  }, sumOfAllDaleys);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
