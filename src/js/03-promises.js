'use strict';
import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleOfSubmit);

function handleOfSubmit(el) {
  el.preventDefault();
  const elOfForm = el.currentTarget.elements;

  let delay = Number(elOfForm.delay.value);
  let step = Number(elOfForm.step.value);
  let amount = Number(elOfForm.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
    .then(({i, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
    })
    .catch(({i, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
    })
    delay += step;
  }
}



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
   return new Promise((resolve, reject) => {
   setInterval(() => {
  if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }
}, delay);
});
}



 