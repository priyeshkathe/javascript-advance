# Advanced JavaScript - Practice Exercises

This folder contains 8 advanced JavaScript modules that build upon the basic DOM manipulation concepts. Each module focuses on ONE concept for easy understanding.

---

## Modules Overview

| Module | Topic | Key Concepts |
|--------|-------|--------------|
| part-1 | Timers | setTimeout, setInterval, clearTimeout, clearInterval |
| part-2 | Promises & Async/Await | Promise, .then(), .catch(), async/await |
| part-3 | Fetch API | fetch(), response.json(), AbortController |
| part-4 | localStorage | setItem, getItem, JSON.stringify, JSON.parse |
| part-5 | Error Handling | try-catch-finally, throw, custom errors |
| part-6 | Form Validation | regex, real-time validation, input formatting |
| part-7 | Working with APIs | GET, POST, PUT, PATCH, DELETE, debouncing |
| part-8 | Final Project - Notes App | Combines all concepts |

---

## Part-1: Timers (setTimeout & setInterval)

**Learn how JavaScript handles delayed and repeated operations**

### Topics Covered:
- `setTimeout()` - Run code once after delay
- `setInterval()` - Run code repeatedly
- `clearTimeout()` - Cancel pending timeout
- `clearInterval()` - Stop running interval
- Execution order with event loop

### Self-Practice Exercises:
1. Change the countdown from 10 to 5 seconds
2. Change setTimeout delay from 2000ms to 3000ms
3. What happens if you call startCountdown() twice?

---

## Part-2: Promises & Async/Await

**Learn how JavaScript handles asynchronous operations**

### Topics Covered:
- `new Promise()` with resolve/reject
- `.then()`, `.catch()`, `.finally()` methods
- Promise states (pending, fulfilled, rejected)
- `async/await` syntax
- `Promise.all()` for parallel operations
- `Promise.race()` for competitive operations

### Self-Practice Exercises:
1. Change the simulated delay from 1500ms to 2500ms
2. Make simulateFailure resolve instead of reject
3. What happens if you remove the .catch()?

---

## Part-3: Fetch API

**Learn to fetch data from external servers**

### Topics Covered:
- `fetch()` for HTTP requests
- `response.json()` to parse JSON
- `response.ok` to check success
- Error handling with try-catch
- `AbortController` to cancel requests
- Loading states

### Self-Practice Exercises:
1. Change API to fetch /posts instead of /users
2. Add a button that fetches a single user by ID
3. What happens if you fetch from invalid URL?

---

## Part-4: localStorage

**Learn to save data in the browser that persists after reload**

### Topics Covered:
- `localStorage.setItem()` and `getItem()`
- `localStorage.removeItem()` and `clear()`
- `JSON.stringify()` and `JSON.parse()`
- `sessionStorage` vs `localStorage`

### Self-Practice Exercises:
1. Save your name and display it on page load
2. Create a "Remember Me" checkbox that saves preference
3. What's the difference between localStorage and sessionStorage?

---

## Part-5: Error Handling

**Learn to handle errors gracefully**

### Topics Covered:
- `try-catch-finally` blocks
- `throw new Error()` for custom errors
- Error properties (message, name)
- Async error handling
- Retry pattern

### Self-Practice Exercises:
1. Change the JSON error message to something custom
2. Create a divide function that throws error for zero
3. Add finally block that logs "Operation complete"

---

## Part-6: Form Validation

**Learn to validate user input before processing**

### Topics Covered:
- Real-time validation with `input` event
- Regular expressions (regex)
- Visual feedback with CSS classes
- Password strength checking
- Input formatting (credit card, phone)
- `preventDefault()` for form submission

### Self-Practice Exercises:
1. Add a phone number field with validation
2. Change minimum username length from 3 to 5
3. Add password requirement for special character

---

## Part-7: Working with APIs (CRUD)

**Learn all HTTP methods for data operations**

### Topics Covered:
- GET - Read data
- POST - Create data
- PUT - Replace entire resource
- PATCH - Update partial data
- DELETE - Remove data
- Debouncing for search
- Pagination

### Self-Practice Exercises:
1. Create a function that POSTs a new comment
2. Explain the difference between PUT and PATCH
3. Implement a reusable debounce function

**API Used:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) - Free fake API

---

## Part-8: Final Project - Notes App

**A complete application combining ALL concepts learned**

### Features:
- Create, Edit, Delete notes
- Color picker for notes
- Category filtering
- Search with debouncing
- Sort by date or title
- Pin important notes
- Dark mode toggle
- Export/Import notes (JSON)
- Data persistence with localStorage
- Keyboard shortcuts (Ctrl+S)

### Self-Practice Exercises:
1. Add a new category called "shopping"
2. Change toast duration from 3 to 5 seconds
3. Add keyboard shortcut Ctrl+D for dark mode

---

## How to Use

1. Navigate to any module folder (e.g., `part-1`)
2. Open `index.html` in your browser
3. Open browser console (F12) to see logs
4. Read code comments for explanations
5. Complete self-practice exercises at the end
6. Experiment by modifying the code

---

## Prerequisites

Before starting these advanced modules, you should be comfortable with:
- HTML & CSS basics
- JavaScript fundamentals (variables, functions, arrays, objects)
- DOM manipulation (querySelector, addEventListener, innerHTML)
- Basic event handling

---

## File Structure

```
javascript-advance/
├── README.md
├── course-overview.txt
├── instructions.txt
├── part-1/                  (Timers)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── part-2/                  (Promises)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── part-3/                  (Fetch API)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── part-4/                  (localStorage)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── part-5/                  (Error Handling)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── part-6/                  (Form Validation)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── part-7/                  (APIs/CRUD)
│   ├── index.html
│   ├── style.css
│   └── script.js
└── part-8/                  (Notes App)
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Tips for Learning

1. **Read the code** - Each file has comments explaining concepts
2. **Use the console** - Open F12 to see detailed logs
3. **Experiment** - Modify the code and see what happens
4. **Break things** - Understanding errors helps you learn
5. **Complete exercises** - Self-practice at end of each part

---

## Quick Reference

### setTimeout & setInterval
```javascript
// Run once after 2 seconds
setTimeout(() => console.log('Hello'), 2000);

// Run every 1 second
const id = setInterval(() => console.log('Tick'), 1000);
clearInterval(id);  // Stop it
```

### Async/Await
```javascript
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
}
```

### Local Storage
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key'));
```

### Error Handling
```javascript
try {
    // risky code
} catch (error) {
    // handle error
} finally {
    // always runs
}
```

### Debouncing
```javascript
let timeout;
input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        // search logic
    }, 300);
});
```

---

Happy Coding!
