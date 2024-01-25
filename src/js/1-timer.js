import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];

        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topCenter',
            });

            disableStartButton();
        } else {
            enableStartButton();
        }
    },
};

flatpickr("#datetime-picker", options);

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', startTimer);

let countdownInterval;

function startTimer() {
    const userSelectedDate = flatpickr("#datetime-picker").selectedDates[0];

    disableStartButton();

    countdownInterval = setInterval(() => {
        const timeRemaining = calculateTimeRemaining(userSelectedDate);

        updateTimerDisplay(timeRemaining);

        if (timeRemaining.total <= 0) {
            clearInterval(countdownInterval);
            iziToast.success({
                title: 'Success',
                message: 'Countdown timer has ended!',
                position: 'topCenter',
            });
        }
    }, 1000);
}

function calculateTimeRemaining(endDate) {
    const now = new Date();
    const difference = endDate - now;

    return convertMs(difference);
}

function updateTimerDisplay(time) {
    const daysElement = document.querySelector('[data-days]');
    const hoursElement = document.querySelector('[data-hours]');
    const minutesElement = document.querySelector('[data-minutes]');
    const secondsElement = document.querySelector('[data-seconds]');

    daysElement.textContent = addLeadingZero(time.days);
    hoursElement.textContent = addLeadingZero(time.hours);
    minutesElement.textContent = addLeadingZero(time.minutes);
    secondsElement.textContent = addLeadingZero(time.seconds);
}

function disableStartButton() {
    startButton.disabled = true;
}

function enableStartButton() {
    startButton.disabled = false;
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
