const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const noTimeLeftMessage = document.getElementById("no-time-left");

const timerCards = document.querySelector(".timer");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const monthNames = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];
let currentInterval = null;

const timer = (year, month, day, hours, minutes, seconds) => {
  if (currentInterval) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
  const monthIndex = monthNames.indexOf(month);

  const targetDate = new Date(year, monthIndex, day, hours, minutes, seconds);

  const now = new Date();

  let timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    timerCards.style.display = "none";
    noTimeLeftMessage.style.display = "block";
    return;
  }
  const interval = setInterval(() => {
    timeLeft -= 1000;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const formattedDays = String(days).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    daysElement.textContent = formattedDays;
    hoursElement.textContent = formattedHours;
    minutesElement.textContent = formattedMinutes;
    secondsElement.textContent = formattedSeconds;

    if (timeLeft <= 0) {
      clearInterval(interval);
      timerCards.style.display = "none";
      noTimeLeftMessage.style.display = "block";
    }
  }, 1000);
  currentInterval = interval;
};
const startTimer = () => {
  const year = parseInt(yearInput.value);
  const month = monthInput.value.trim().toLowerCase();
  const day = parseInt(dateInput.value);

  const timeParts = timeInput.value.split(":");
  const hours = parseInt(timeParts[0]) || 0;
  const minutes = parseInt(timeParts[1]) || 0;
  const seconds = 0;

  if (year && month && day && timeParts) {
    timer(year, month, day, hours, minutes, seconds);
    yearInput.value = "";
    monthInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
  } else {
    alert("Пожалуйста, заполните все поля");
  }
};

startBtn.addEventListener("click", () => {
  startTimer();
});

// Проблемы:
// 1. сделать валидацию года,месяца,дня,времени через регулярные выражения
