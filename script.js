// Postavljanje trenutnog datuma
const date = new Date();
date.setDate(1);

// Funkcija za renderiranje kalendara
const renderCalendar = () => {
    const monthDays = document.querySelector(".days");

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    // Adjust firstDayIndex to make Monday the start of the week
    let firstDayIndex = date.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6; // Convert Sunday (0) to 6 for Monday start

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    document.querySelector('.date h1').innerHTML = months[date.getMonth()];
    document.querySelector('.date p').innerHTML = new Date().toDateString();

    let days = "";

    // Days from the previous month
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    // Current month days
    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    // Days from next month
    for (let y = 1; y <= nextDays + 1; y++) {
        days += `<div class="next-date">${y}</div>`;
    }

    monthDays.innerHTML = days;

    // Event listeneri za prethodni i sljedeći mjesec
    document.querySelectorAll(".prev-date").forEach(element => {
        element.addEventListener("click", () => {
            date.setMonth(date.getMonth() - 1);
            renderCalendar();
        });
    });

    document.querySelectorAll(".next-date").forEach(element => {
        element.addEventListener("click", () => {
            date.setMonth(date.getMonth() + 1);
            renderCalendar();
        });
    });
};

// Navigacija mjesecima
document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

// Poziv funkcije za inicijalni render
renderCalendar();

// ---------------------------
// Feature: Digitalni sat
// ---------------------------
const clockElement = document.createElement("div");
clockElement.classList.add("digital-clock");
document.querySelector(".container").appendChild(clockElement);

const updateClock = () => {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString();
};
setInterval(updateClock, 1000);
updateClock();

// ---------------------------
// Feature: Alarm
// ---------------------------
const alarmElement = document.createElement("div");
alarmElement.classList.add("alarm");
document.querySelector(".container").appendChild(alarmElement);

const setAlarm = () => {
    const now = new Date();
    const alarmTime = new Date();
    alarmTime.setSeconds(now.getSeconds() + 10); // alarm se aktivira za 10 sekundi
    const checkAlarm = setInterval(() => {
        const current = new Date();
        if (current >= alarmTime) {
            alert("Alarm! ⏰");
            clearInterval(checkAlarm);
        }
    }, 1000);
};
setAlarm();
