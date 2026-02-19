/**
 * Part 4: localStorage - Saving Data in Browser
 *
 * Learn:
 * - localStorage.setItem(key, value) - Save data
 * - localStorage.getItem(key) - Get data
 * - localStorage.removeItem(key) - Delete one item
 * - localStorage.clear() - Delete all items
 * - JSON.stringify() and and JSON.parse() for objects
 */

console.log('=== Part 4: localStorage ===');


// ============================================
// TOPIC 1: Basic localStorage Operations
// ============================================
// localStorage stores key value key-value pairs as STRINGS

const keyInput = document.querySelector('#key-input');
const valueInput = document.querySelector('#value-input');
const saveBtn = document.querySelector('#save-btn');
const getBtn = document.querySelector('#get-btn');
const basicOutput = document.querySelector('#basic-output');
const viewAllBtn = document.querySelector('#view-all-btn');
const clearAllBtn = document.querySelector('#clear-all-btn');
const storageItems = document.querySelector('#storage-items');

// Save to localStorage
saveBtn.addEventListener('click', () => {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();

    if (!key || !value) {
        basicOutput.textContent = 'Enter both key and value!';
        return;
    }

    // setItem(key, value) - saves data
    localStorage.setItem(key, value);
    basicOutput.textContent = `Saved: "${key}" = "${value}"`;

    keyInput.value = '';
    valueInput.value = '';
});

// Get from localStorage
getBtn.addEventListener('click', () => {
    const key = keyInput.value.trim();

    if (!key) {
        basicOutput.textContent = 'Enter a key to get!';
        return;
    }

    // getItem(key) - returns value or null if not found
    const value = localStorage.getItem(key);

    if (value !== null) {
        basicOutput.textContent = `Found: "${key}" = "${value}"`;
    } else {
        basicOutput.textContent = `Key "${key}" not found!`;
    }
});

// View all items
function showAllItems() {
    storageItems.innerHTML = '';

    if (localStorage.length === 0) {
        storageItems.innerHTML = '<p>No items stored</p>';
        return;
    }

    // Loop through all stored items
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);  // Get key by index
        const value = localStorage.getItem(key);

        const div = document.createElement('div');
        div.className = 'storage-item';
        div.innerHTML = `
            <span><b>${key}:</b> ${value}</span>
            <button onclick="deleteItem('${key}')">Delete</button>
        `;
        storageItems.appendChild(div);
    }
}

viewAllBtn.addEventListener('click', showAllItems);

// Delete one item
window.deleteItem = function(key) {
    localStorage.removeItem(key);  // Remove specific item
    showAllItems();
};

// Clear all
clearAllBtn.addEventListener('click', () => {
    if (confirm('Delete ALL stored data?')) {
        localStorage.clear();  // Remove everything
        storageItems.innerHTML = '<p>All cleared!</p>';
    }
});


// ============================================
// TOPIC 2: Storing Objects (JSON)
// ============================================
// IMPORTANT: localStorage only stores strings!
// Objects become "[object Object]" if not converted

const profileName = document.querySelector('#profile-name');
const profileEmail = document.querySelector('#profile-email');
const profileAge = document.querySelector('#profile-age');
const saveProfileBtn = document.querySelector('#save-profile-btn');
const loadProfileBtn = document.querySelector('#load-profile-btn');
const profileOutput = document.querySelector('#profile-output');

saveProfileBtn.addEventListener('click', () => {
    // Create an object
    const profile = {
        name: profileName.value || 'Unknown',
        email: profileEmail.value || 'none@email.com',
        age: parseInt(profileAge.value) || 0
    };

    // JSON.stringify() converts object to string
    const jsonString = JSON.stringify(profile);

    localStorage.setItem('userProfile', jsonString);

    profileOutput.textContent = `Saved as JSON string:\n${jsonString}`;
});

loadProfileBtn.addEventListener('click', () => {
    const jsonString = localStorage.getItem('userProfile');

    if (!jsonString) {
        profileOutput.textContent = 'No profile saved!';
        return;
    }

    // JSON.parse() converts string back to object
    const profile = JSON.parse(jsonString);

    // Now we can access properties
    profileName.value = profile.name;
    profileEmail.value = profile.email;
    profileAge.value = profile.age;

    profileOutput.textContent = `Loaded profile:\nName: ${profile.name}\nEmail: ${profile.email}\nAge: ${profile.age}`;
});


// ============================================
// TOPIC 3: Persistent Visit Counter
// ============================================
// Data persists even after closing the browser

const visitCount = document.querySelector('#visit-count');
const clickCount = document.querySelector('#click-count');
const clickBtn = document.querySelector('#click-btn');
const resetStatsBtn = document.querySelector('#reset-stats-btn');

// Load and increment visit count on page load
let visits = parseInt(localStorage.getItem('visitCount') || '0');
visits++;
localStorage.setItem('visitCount', visits);
visitCount.textContent = visits;

// Load click count
let clicks = parseInt(localStorage.getItem('clickCount') || '0');
clickCount.textContent = clicks;

// Increment clicks on button click
clickBtn.addEventListener('click', () => {
    clicks++;
    localStorage.setItem('clickCount', clicks);
    clickCount.textContent = clicks;
});

// Reset stats
resetStatsBtn.addEventListener('click', () => {
    localStorage.setItem('visitCount', '0');
    localStorage.setItem('clickCount', '0');
    visitCount.textContent = '0';
    clickCount.textContent = '0';
    clicks = 0;
});


// ============================================
// TOPIC 4: localStorage vs sessionStorage
// ============================================
// localStorage - stays forever (until manually cleared)
// sessionStorage - clears when browser tab closes

const dualInput = document.querySelector('#dual-input');
const saveBothBtn = document.querySelector('#save-both-btn');
const checkBothBtn = document.querySelector('#check-both-btn');
const localValue = document.querySelector('#local-value');
const sessionValue = document.querySelector('#session-value');

saveBothBtn.addEventListener('click', () => {
    const value = dualInput.value.trim();
    if (!value) return;

    // Save to both storages
    localStorage.setItem('testValue', value);
    sessionStorage.setItem('testValue', value);

    localValue.textContent = value;
    sessionValue.textContent = value;

    alert('Saved! Try closing this tab and reopening.');
});

checkBothBtn.addEventListener('click', () => {
    localValue.textContent = localStorage.getItem('testValue') || 'Empty';
    sessionValue.textContent = sessionStorage.getItem('testValue') || 'Empty';
});

// Show values on page load
localValue.textContent = localStorage.getItem('testValue') || 'Empty';
sessionValue.textContent = sessionStorage.getItem('testValue') || 'Empty';


console.log('Part 4 loaded! Study the code above, then try the exercises below.');


// ============================================
// ============================================
// SELF-PRACTICE EXERCISES
// ============================================
// ============================================

/*
EXERCISE 1: Why Does This Fail?
-------------------------------
This code tries to save an array but doesn't work right.
What's wrong? How do you fix it?

const colors = ['red', 'green', 'blue'];
localStorage.setItem('colors', colors);

const saved = localStorage.getItem('colors');
console.log(saved);        // What does this print?
console.log(saved[0]);     // What does this print?

Fix: _______________
*/


/*
EXERCISE 2: Build a To-Do List
------------------------------
Create functions to manage a to-do list in localStorage.

let todos = [];

function loadTodos() {
    // Load todos from localStorage
    // Remember to JSON.parse!
}

function saveTodos() {
    // Save todos to localStorage
    // Remember to JSON.stringify!
}

function addTodo(text) {
    // Add new todo and save
}

function removeTodo(index) {
    // Remove todo at index and save
}
*/


/*
EXERCISE 3: Theme Preference
----------------------------
Save user's preferred theme (light/dark) to localStorage.
Load it when the page opens.

function setTheme(theme) {
    // Save theme to localStorage
    // Apply theme to body
}

function loadTheme() {
    // Load theme from localStorage
    // Apply it
}

// Call loadTheme on page load
*/
