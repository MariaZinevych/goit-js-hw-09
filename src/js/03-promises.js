function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
const form = document.querySelector('.form');
const promiseCreate = document.querySelector('button[type="submit"]');
const inputFirstDelay = document.querySelector(['delay']);
const inputDelayStep = document.querySelector(['step']);
const inputAmount = document.querySelector(['amount']);
