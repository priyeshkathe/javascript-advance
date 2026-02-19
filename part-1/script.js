/**
 * Part 1: Timers - setTimeout & setInterval
 *
 * Learn:
 * - setTimeout: Run code ONCE after a delay
 * - setInterval: Run code REPEATEDLY
 * - clearTimeout & clearInterval: Stop timers
 */

console.log('=== Part 1: Timers ===');


// ============================================
// TOPIC 1: setTimeout - Run Once After Delay
// ============================================
// setTimeout(callback, milliseconds)
// 1000ms = 1 second

const delayedBtn = document.querySelector('#delayed-btn');
const delayedOutput = document.querySelector('#delayed-output');

delayedBtn.addEventListener('click', () => {
    delayedOutput.textContent = 'Waiting 2 seconds...';

    // This code runs ONCE after 2000ms (2 seconds)
    setTimeout(() => {
        delayedOutput.textContent = 'Hello! This appeared after 2 seconds!';
        delayedOutput.className = 'output success';
    }, 2000);
});


// ----- Custom Delay -----
const delayInput = document.querySelector('#delay-input');
const customDelayBtn = document.querySelector('#custom-delay-btn');
const customOutput = document.querySelector('#custom-output');

customDelayBtn.addEventListener('click', () => {
    const delay = parseInt(delayInput.value) || 1000;
    customOutput.textContent = `Waiting ${delay}ms...`;

    setTimeout(() => {
        customOutput.textContent = `Done! Appeared after ${delay}ms`;
        customOutput.className = 'output success';
    }, delay);
});


// ============================================
// TOPIC 2: setInterval - Run Repeatedly
// ============================================
// setInterval(callback, milliseconds)
// Runs the callback every X milliseconds

// ----- Live Clock -----
const clockDisplay = document.querySelector('#clock-display');

// Update clock every second (1000ms)
setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    clockDisplay.textContent = time;
}, 1000);


// ----- Countdown Timer -----
const countdownDisplay = document.querySelector('#countdown-display');
const startBtn = document.querySelector('#start-countdown');
const stopBtn = document.querySelector('#stop-countdown');
const resetBtn = document.querySelector('#reset-countdown');

let count = 10;
let intervalId = null;  // Store the interval ID to stop it later

startBtn.addEventListener('click', () => {
    // Don't start if already running
    if (intervalId !== null) return;

    // setInterval returns an ID we can use to stop it
    intervalId = setInterval(() => {
        count--;
        countdownDisplay.textContent = count;

        // Stop when we reach 0
        if (count <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            countdownDisplay.textContent = 'Done!';
        }
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    // clearInterval stops the repeating timer
    clearInterval(intervalId);
    intervalId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    count = 10;
    countdownDisplay.textContent = '10';
});


// ============================================
// TOPIC 3: clearTimeout - Cancel Before Execution
// ============================================
// clearTimeout(timeoutId) - Cancel a setTimeout

const startDelayedBtn = document.querySelector('#start-delayed');
const cancelDelayedBtn = document.querySelector('#cancel-delayed');
const cancelOutput = document.querySelector('#cancel-output');

let timeoutId = null;

startDelayedBtn.addEventListener('click', () => {
    cancelOutput.textContent = 'Timer started! 3 seconds remaining...';

    // Store the timeout ID
    timeoutId = setTimeout(() => {
        cancelOutput.textContent = 'Timer completed!';
        cancelOutput.className = 'output success';
        timeoutId = null;
    }, 3000);
});

cancelDelayedBtn.addEventListener('click', () => {
    if (timeoutId !== null) {
        // clearTimeout cancels the pending setTimeout
        clearTimeout(timeoutId);
        timeoutId = null;
        cancelOutput.textContent = 'Timer cancelled!';
    }
});


console.log('Part 1 loaded! Study the code above, then try the exercises below.');


// ============================================
// ============================================
// SELF-PRACTICE EXERCISES
// ============================================
// ============================================

/*
EXERCISE 1: Predict the Order
-----------------------------
What order will these print? Write your answer, then run in console.

console.log('A');
setTimeout(() => console.log('B'), 1000);
setTimeout(() => console.log('C'), 0);
console.log('D');

Your answer: ___, ___, ___, ___
*/


/*
EXERCISE 2: Create a Stopwatch
------------------------------
Create a stopwatch that counts UP instead of down.
- Starts at 0
- Increases every second
- Can be started, stopped, and reset

let stopwatchTime = 0;
let stopwatchInterval = null;

function startStopwatch() {
    // Your code here
}

function stopStopwatch() {
    // Your code here
}

function resetStopwatch() {
    // Your code here
}
*/


/*
EXERCISE 3: Blinking Text
-------------------------
Make text that blinks (shows/hides) every 500ms.
Use setInterval and toggle the visibility.

Hint: element.style.visibility = 'hidden' or 'visible'
*/
