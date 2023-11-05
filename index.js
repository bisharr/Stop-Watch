'use strict';
const timerEl = document.getElementById('timer');
const startButtonEl = document.getElementById('start');
const stoptButtonEl = document.getElementById('stop');
const resetButtonEl = document.getElementById('reset');
const iconEl = document.querySelector('.icon');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerEl.textContent = formatTime(elapsedTime);
  }, 10);
  startButtonEl.disabled = true;
  stoptButtonEl.disabled = false;
}
function formatTime(elapsedTime) {
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  return (
    (hours ? (hours > 9 ? hours : '0' + hours) : '00') +
    ':' +
    (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') +
    ':' +
    (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00') +
    '.' +
    (milliseconds > 9 ? milliseconds : '0' + milliseconds)
  );
}

function stoptimer() {
  clearInterval(timerInterval);

  startButtonEl.disabled = false;
  stoptButtonEl.disabled = true;
}

function resetTimer() {
  elapsedTime = 0;
  clearInterval(timerInterval);

  timerEl.textContent = '00:00:00';

  startButtonEl.disabled = false;
  stoptButtonEl.disabled = true;
  console.log('reset button');
}

startButtonEl.addEventListener('click', startTimer);

stoptButtonEl.addEventListener('click', stoptimer);

resetButtonEl.addEventListener('click', resetTimer);

iconEl.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    iconEl.src = 'sun.png';
  } else {
    iconEl.src = 'moon.png';
  }
});
