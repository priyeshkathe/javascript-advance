/**
 * Part 2: Promises & Async/Await
 *
 * Learn:
 * - What is a Promise (pending, fulfilled, rejected)
 * - .then() and .catch() for handling results
 * - async/await syntax catch
 * - Promise.all() for parallel execution
 * - Promise.race() for first-to-finish
 */

console.log('=== Part 2: Promises & Async/Await ===');


// ============================================
// TOPIC 1: What is a Promise?
// ============================================
// A Promise represents a future value
// States: pending -> fulfilled (success) OR rejected (failure)

const promiseSuccessBtn = document.querySelector('#promise-success');
const promiseFailBtn = document.querySelector('#promise-fail');
const promiseOutput = document.querySelector('#promise-output');

// Function that returns a Promise
function doAsyncWork(willSucceed) {
    // new Promise takes a function with resolve and reject
    return new Promise((resolve, reject) => {
        // Simulate async work with setTimeout
        setTimeout(() => {
            if (willSucceed) {
                resolve('Success! Operation completed.');  // Call resolve for success
            } else {
                reject('Failed! Something went wrong.');   // Call reject for failure
            }
        }, 2000);
    });
}

promiseSuccessBtn.addEventListener('click', () => {
    promiseOutput.textContent = 'Loading...';
    promiseOutput.className = 'output loading';

    doAsyncWork(true)
        .then(result => {
            // .then() runs when promise succeeds (resolved)
            promiseOutput.textContent = result;
            promiseOutput.className = 'output success';
        })
        .catch(error => {
            // .catch() runs when promise fails (rejected)
            promiseOutput.textContent = error;
            promiseOutput.className = 'output error';
        });
});

promiseFailBtn.addEventListener('click', () => {
    promiseOutput.textContent = 'Loading...';
    promiseOutput.className = 'output loading';

    doAsyncWork(false)
        .then(result => {
            promiseOutput.textContent = result;
            promiseOutput.className = 'output success';
        })
        .catch(error => {
            promiseOutput.textContent = error;
            promiseOutput.className = 'output error';
        });
});


// ============================================
// TOPIC 2: Promise Chaining
// ============================================
// Each .then() returns a new Promise  DONE
// You can chain multiple .then() calls

const promiseChainBtn = document.querySelector('#promise-chain');
const chainOutput = document.querySelector('#chain-output');

function step(num, delay) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Step ${num} complete`), delay);
    });
}

promiseChainBtn.addEventListener('click', () => {
    chainOutput.textContent = 'Starting...\n';
    chainOutput.className = 'output loading';

    // Chaining: each .then() waits for the previous one
    step(1, 1000)
        .then(result => {
            chainOutput.textContent += result + '\n';
            return step(2, 1000);  // Return next promise
        })
        .then(result => {
            chainOutput.textContent += result + '\n';
            return step(3, 1000);
        })
        .then(result => {
            chainOutput.textContent += result + '\nAll done!';
            chainOutput.className = 'output success';
        });
});


// ============================================
// TOPIC 3: async/await - Modern Syntax
// ============================================
// async function - always returns a Promise
// await - pauses until Promise resolves

const asyncBtn = document.querySelector('#async-btn');
const asyncOutput = document.querySelector('#async-output');

// Same as chain above, but with async/await
async function runStepsAsync() {
    asyncOutput.textContent = 'Starting...\n';
    asyncOutput.className = 'output loading';

    // await pauses here until step(1) resolves
    const result1 = await step(1, 1000);
    asyncOutput.textContent += result1 + '\n';

    const result2 = await step(2, 1000);
    asyncOutput.textContent += result2 + '\n';

    const result3 = await step(3, 1000);
    asyncOutput.textContent += result3 + '\nAll done!';
    asyncOutput.className = 'output success';
}

asyncBtn.addEventListener('click', runStepsAsync);


// ============================================
// TOPIC 4: Promise.all - Run in Parallel
// ============================================
// Promise.all([p1, p2, p3]) - Runs all promises at same time
// Resolves when ALL complete, or rejectsif ANY fails

const parallelBtn = document.querySelector('#parallel-btn');
const parallelOutput = document.querySelector('#parallel-output');

function task(name, delay) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`${name} done (${delay}ms)`), delay);
    });
}

parallelBtn.addEventListener('click', async () => {
    parallelOutput.textContent = 'Running all tasks at once...\n';
    parallelOutput.className = 'output loading';

    const start = Date.now();

    // All 3 tasks start at the same time!
    const results = await Promise.all([
        task('Task A', 1000),
        task('Task B', 2000),
        task('Task C', 1500)
    ]);

    const totalTime = Date.now() - start;

    parallelOutput.textContent = results.join('\n');
    parallelOutput.textContent += `\n\nTotal time: ${totalTime}ms (not 4500ms!)`;
    parallelOutput.className = 'output success';
});


// ============================================
// TOPIC 5: Promise.race - First Wins
// ============================================
// Promise.race([p1, p2, p3]) - Returns first to finish

const raceBtn = document.querySelector('#race-btn');
const raceOutput = document.querySelector('#race-output');

raceBtn.addEventListener('click', async () => {
    raceOutput.textContent = 'Racing...\n';
    raceOutput.className = 'output loading';

    // First promise to finish wins
    const winner = await Promise.race([
        task('Slow', 2000),
        task('Medium', 1500),
        task('Fast', 500)
    ]);

    raceOutput.textContent = `Winner: ${winner}`;
    raceOutput.className = 'output success';
});


console.log('Part 2 loaded! Study the code above, then try the exercises below.');


// ============================================
// ============================================
// SELF-PRACTICE EXERCISES
// ============================================
// ============================================

/*
EXERCISE 1: Create Your Own Promise
-----------------------------------
Create a function that returns a Promise.
It should resolve with "Hello!" after 1 second.

function sayHello() {
    return new Promise((resolve, reject) => {
        // Your code here
    });
}

// Test it:
sayHello().then(message => console.log(message));
*/


/*
EXERCISE 2: Convert to async/await
----------------------------------
Convert this .then() code to async/await:

function fetchData() {
    return step(1, 1000)
        .then(result => {
            console.log(result);
            return step(2, 1000);
        })
        .then(result => {
            console.log(result);
        });
}

// Your async/await version:
async function fetchDataAsync() {
    // Your code here
}
*/


/*
EXERCISE 3: Promise.all with Error
----------------------------------
What happens if one promise in Promise.all fails?
Test it:

Promise.all([
    Promise.resolve('A'),
    Promise.reject('Error!'),
    Promise.resolve('C')
])
.then(results => console.log(results))
.catch(error => console.log('Caught:', error));

What gets logged? _______________
*/
