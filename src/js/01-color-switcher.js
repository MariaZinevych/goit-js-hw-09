const bthStart = document.querySelector('button[data-start]');
const bthStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

bthStart.addEventListener('click', () => {
  (timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000)),
    bthStart.setAttribute('disabled', ''),
    bthStop.removeAttribute('disabled');
});

bthStop.addEventListener('click', () => {
  clearInterval(timerId);
  bthStop.setAttribute('disabled', ''), bthStart.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
