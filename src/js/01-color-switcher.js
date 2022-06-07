'use strict';
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }



  btnStartEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;

  })

  btnStopEl.addEventListener('click', () => {
    clearInterval(timerId);
    btnStartEl.disabled = false;
    btnStopEl.disabled = true;
  });