import Notiflix from 'notiflix';

const refs = {
  delayInput: document.querySelector('[name=delay]'),
  stepInput: document.querySelector('[name=step]'),
  amountInput: document.querySelector('[name=amount]'),
  submitBtn: document.querySelector('button'),
}

refs.submitBtn.addEventListener('submit', onSubmitBtn);


function onSubmitBtn(event) {
    event.preventDefault();
  const data = {
    delay: Number(refs.delayInput.value),
    step: Number(refs.stepInput.value),
    amount: Number(refs.amountInput.value),
  }
  
  newPromiseCreation(data);
}
  
function  newPromiseCreation({ delay, step, amount }) {
  let calculatedDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, calculatedDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
     calculatedDelay += step;
  }
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