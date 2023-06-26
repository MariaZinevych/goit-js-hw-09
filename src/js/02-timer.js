import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const COUTDOWN_TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

Report.info(
  'Greeting, my Friend!',
  'Please, choose a date and click on start',
  'Okay'
);

flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        'Ooops...',
        'Please, choose a date in the future!!!',
        'Okay'
      );
    } else {
      Report.success('Perfectly! Click on start!', '', 'Okay');
      startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };

      startBtn.addEventListener('click', setTimer);
    }
  },
});

const timer = {
  rootSelector: document.querySelector('.timer'),
  start() {
    intervalId = setInterval(() => {
      startBtn.disabled = true;
      calendar.disabled = true;
      currentDate = Date.now();
      const delta = selectedDate - currentDate;

      if (delta <= 0) {
        this.stop();
        Report.info(
          'Congratulation! Timer stopped!',
          'Please, if you want to start timer, choose a date and click on start or reload this page',
          'Okay'
        );
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.rootSelector.querySelector('[data-days]').textContent =
        this.addingZero(days);
      this.rootSelector.querySelector('[data-hours]').textContent =
        this.addingZero(hours);
      this.rootSelector.querySelector('[data-minutes]').textContent =
        this.addingZero(minutes);
      this.rootSelector.querySelector('[data-seconds]').textContent =
        this.addingZero(seconds);
    }, COUTDOWN_TIMER_DELAY);
  },

  stop() {
    clearInterval(intervalId);
    this.intervalId = null;
    startBtn.disabled = true;
    calendar.disabled = false;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addingZero(Math.floor(ms / day));
    const hours = this.addingZero(Math.floor((ms % day) / hour));
    const minutes = this.addingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  },

  addingZero(value) {
    return String(value).padStart(2, 0);
  },
};

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// const input = document.querySelector('#datetime-picker');

// const day = document.querySelector('.value[data-days]');
// const hours = document.querySelector('.value[data-hours]');
// const minutes = document.querySelector('.value[data-minutes]');
// const seconds = document.querySelector('.value[data-seconds]');
// const start = document.querySelector('button[data-start]');

// let intervalId = null;
// let selectedDate = null;
// let currentDate = null;

// const f = flatpickr(input, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime < Date.now) {
//       window.alert('Please choose a date in the future');
//     } else {
//       start.disabled = false;
//       const setTimer = () => {
//         selectedDate = selectedDates[0].getTime();
//         timer.start();
//       };
//       start.addEventListener('click', setTimer);
//     }
//   },
// });
// console.log(f);

// flatpickr(calendar, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       Report.failure(
//         'Ooops...',
//         'Please, choose a date in the future!!!',
//         'Okay'
//       );
//     } else {
//       Report.success('Perfectly! Click on start!', '', 'Okay');
//       startBtn.disabled = false;
//       const setTimer = () => {
//         selectedDate = selectedDates[0].getTime();
//         timer.start();
//       };

//       startBtn.addEventListener('click', setTimer);
//     }
//   },
// });

// const timer = {
//   rootSelector: document.querySelector('.timer'),
//   start() {
//     intervalId = setInterval(() => {
//       start.disabled = true;
//       calendar.disabled = true;
//       currentDate = Date.now();
//       const delta = selectedDate - currentDate;

//       if (delta <= 0) {
//         this.stop();
//         Report.info(
//           'Congratulation! Timer stopped!',
//           'Please, if you want to start timer, choose a date and click on start or reload this page',
//           'Okay'
//         );
//         return;
//       }

//       const { days, hours, minutes, seconds } = this.convertMs(delta);
//       this.rootSelector.querySelector('[data-days]').textContent =
//         this.addingZero(days);
//       this.rootSelector.querySelector('[data-hours]').textContent =
//         this.addingZero(hours);
//       this.rootSelector.querySelector('[data-minutes]').textContent =
//         this.addingZero(minutes);
//       this.rootSelector.querySelector('[data-seconds]').textContent =
//         this.addingZero(seconds);
//     }, COUTDOWN_TIMER_DELAY);
//   },

//   stop() {
//     clearInterval(intervalId);
//     this.intervalId = null;
//     start.disabled = true;
//     calendar.disabled = false;
//   },

//   convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = this.addingZero(Math.floor(ms / day));
//     const hours = this.addingZero(Math.floor((ms % day) / hour));
//     const minutes = this.addingZero(Math.floor(((ms % day) % hour) / minute));
//     const seconds = this.addingZero(
//       Math.floor((((ms % day) % hour) % minute) / second)
//     );

//     return { days, hours, minutes, seconds };
//   },

//   addingZero(value) {
//     return String(value).padStart(2, 0);
//   },
// };
