/**
 * Part 5: Error Handling
 *
 * Learn:
 * - try { } catch (error) { } - Catch and handle errors
 * - throw new Error() - Create your own errors
 * - finally { } - Code that always run
 * - Custom error classes
 * - Async error handling
 */

console.log('=== Part 5: Error Handling ===');


// ============================================
// TOPIC 1: Basic try-catch
// ============================================
// try { risky code } catch (error) { handle error }

const jsonInput = document.querySelector('#json-input');
const parseBtn = document.querySelector('#parse-btn');
const parseOutput = document.querySelector('#parse-output');

parseBtn.addEventListener('click', () => {
    const text = jsonInput.value.trim();

    try {
        // JSON.parse throws error if JSON is invalid
        const data = JSON.parse(text);
        parseOutput.textContent = 'Parsed successfully!\n' + JSON.stringify(data, null, 2);
        parseOutput.className = 'output success';
    } catch (error) {
        // Catch the error and handle it
        parseOutput.textContent = 'Error: ' + error.message;
        parseOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 2: Throwing Custom Errors
// ============================================
// throw new Error('message') - Create and throw an error

const numA = document.querySelector('#num-a');
const numB = document.querySelector('#num-b');
const divideBtn = document.querySelector('#divide-btn');
const divideOutput = document.querySelector('#divide-output');

divideBtn.addEventListener('click', () => {
    try {
        const a = parseFloat(numA.value);
        const b = parseFloat(numB.value);

        // Throw error for invalid input
        if (isNaN(a) || isNaN(b)) {
            throw new Error('Please enter valid numbers');
        }

        // Throw error for division by zero
        if (b === 0) {
            throw new Error('Cannot divide by zero!');
        }

        const result = a / b;
        divideOutput.textContent = `${a} ÷ ${b} = ${result}`;
        divideOutput.className = 'output success';

    } catch (error) {
        divideOutput.textContent = 'Error: ' + error.message;
        divideOutput.className = 'output error';
    }
});


// ----- Age Verification -----
const ageInput = document.querySelector('#age-input');
const verifyBtn = document.querySelector('#verify-btn');
const ageOutput = document.querySelector('#age-output');

verifyBtn.addEventListener('click', () => {
    try {
        const age = parseInt(ageInput.value);

        if (isNaN(age)) {
            throw new Error('Please enter a valid number');
        }

        if (age < 0) {
            throw new Error('Age cannot be negative');
        }

        if (age < 18) {
            throw new Error('You must be 18 or older');
        }

        ageOutput.textContent = `Access granted! Age: ${age}`;
        ageOutput.className = 'output success';

    } catch (error) {
        ageOutput.textContent = 'Error: ' + error.message;
        ageOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 3: The finally Block
// ============================================
// finally ALWAYS runs - success or failure

const finallySuccessBtn = document.querySelector('#finally-success-btn');
const finallyFailBtn = document.querySelector('#finally-fail-btn');
const finallyOutput = document.querySelector('#finally-output');
const finallyLog = document.querySelector('#finally-log');

finallySuccessBtn.addEventListener('click', () => {
    finallyLog.textContent = '';

    try {
        finallyLog.textContent += '1. Try: Starting...\n';
        // Success - no error
        finallyOutput.textContent = 'Operation succeeded!';
        finallyOutput.className = 'output success';
        finallyLog.textContent += '2. Try: Completed!\n';
    } catch (error) {
        finallyLog.textContent += '2. Catch: Handling error\n';
    } finally {
        // This ALWAYS runs
        finallyLog.textContent += '3. Finally: Cleanup (always runs!)';
    }
});

finallyFailBtn.addEventListener('click', () => {
    finallyLog.textContent = '';

    try {
        finallyLog.textContent += '1. Try: Starting...\n';
        throw new Error('Something broke!');
    } catch (error) {
        finallyLog.textContent += '2. Catch: Handling error\n';
        finallyOutput.textContent = 'Error: ' + error.message;
        finallyOutput.className = 'output error';
    } finally {
        // This ALWAYS runs, even after error
        finallyLog.textContent += '3. Finally: Cleanup (always runs!)';
    }
});


// ============================================
// TOPIC 4: Custom Error Classes
// ============================================
// Create specific error types by extending Error

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

const errorType = document.querySelector('#error-type');
const throwBtn = document.querySelector('#throw-btn');
const customOutput = document.querySelector('#custom-output');

throwBtn.addEventListener('click', () => {
    try {
        const type = errorType.value;

        if (type === 'validation') {
            throw new ValidationError('Invalid input data');
        } else if (type === 'auth') {
            throw new AuthError('You are not logged in');
        } else {
            throw new NetworkError('Connection failed');
        }

    } catch (error) {
        // We can check error type
        customOutput.textContent = `${error.name}: ${error.message}`;
        customOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 5: Async Error Handling
// ============================================
// Use try-catch with async/await

const fetchGoodBtn = document.querySelector('#fetch-good-btn');
const fetchBadBtn = document.querySelector('#fetch-bad-btn');
const asyncOutput = document.querySelector('#async-output');

fetchGoodBtn.addEventListener('click', async () => {
    asyncOutput.textContent = 'Fetching...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        asyncOutput.textContent = `Success! Got: ${data.name}`;
        asyncOutput.className = 'output success';

    } catch (error) {
        asyncOutput.textContent = 'Error: ' + error.message;
        asyncOutput.className = 'output error';
    }
});

fetchBadBtn.addEventListener('click', async () => {
    asyncOutput.textContent = 'Fetching invalid URL...';

    try {
        const response = await fetch('https://invalid-url-12345.com');
        const data = await response.json();
        asyncOutput.textContent = JSON.stringify(data);
    } catch (error) {
        asyncOutput.textContent = 'Network Error: ' + error.message;
        asyncOutput.className = 'output error';
    }
});


console.log('Part 5 loaded! Study the code above, then try the exercises below.');


// ============================================
// ============================================
// SELF-PRACTICE EXERCISES
// ============================================
// ============================================

/*
EXERCISE 1: Will This Catch the Error?
--------------------------------------
Will the error be caught? Why or why not?

try {
    setTimeout(() => {
        throw new Error('Delayed error!');
    }, 1000);
} catch (error) {
    console.log('Caught:', error.message);
}

Answer: _______________
Why: _______________
*/


/*
EXERCISE 2: Create a Safe Parser
--------------------------------
Create a function that safely parses JSON.
Return null if parsing fails instead of throwing.

function safeJsonParse(str) {
    // Your code here
    // Return parsed object or null if invalid
}

// Test:
console.log(safeJsonParse('{"a": 1}'));  // {a: 1}
console.log(safeJsonParse('invalid'));   // null
*/


/*
EXERCISE 3: Create Your Own Error Class
---------------------------------------
Create a custom error class called "InvalidEmailError".

class InvalidEmailError extends Error {
    // Your code here
}

function validateEmail(email) {
    // Throw InvalidEmailError if email doesn't contain @
}
*/
