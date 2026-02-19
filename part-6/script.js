/**
 * Part 6: Form Validation
 *
 * Learn:
 * - Real-time validation with 'input' event
 * - Regular expressions (regex) for patterns
 * - Password strength checking
 * - Input formatting
 * - Form submit validation
 */

console.log('=== Part 6: Form Validation ===');


// ============================================
// TOPIC 1: Real-Time Input Validation
// ============================================
// Validate as user types using the 'input' event

const usernameInput = document.querySelector('#username');
const usernameError = document.querySelector('#username-error');
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

// Username validation - min 3 characters
usernameInput.addEventListener('input', () => {
    const value = usernameInput.value;
    const isValid = value.length >= 3;

    // Add CSS class based on validity
    usernameInput.className = isValid ? 'valid' : 'invalid';

    // Show/hide error message
    usernameError.className = isValid ? 'error-msg' : 'error-msg show';
});

// Email validation - using regex
emailInput.addEventListener('input', () => {
    const value = emailInput.value;

    // Regex pattern for email: something@something.something
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);

    emailInput.className = isValid ? 'valid' : 'invalid';
    emailError.className = isValid ? 'error-msg' : 'error-msg show';
});


// ============================================
// TOPIC 2: Password Strength Checker
// ============================================
// Check multiple rules using regex

const passwordInput = document.querySelector('#password');
const strengthBar = document.querySelector('#strength-bar');
const ruleLength = document.querySelector('#rule-length');
const ruleUpper = document.querySelector('#rule-upper');
const ruleLower = document.querySelector('#rule-lower');
const ruleNumber = document.querySelector('#rule-number');
const ruleSpecial = document.querySelector('#rule-special');

passwordInput.addEventListener('input', () => {
    const pass = passwordInput.value;

    // Check each rule with regex
    const hasLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);   // At least one uppercase
    const hasLower = /[a-z]/.test(pass);   // At least one lowercase
    const hasNumber = /[0-9]/.test(pass);  // At least one number
    const hasSpecial = /[!@#$%^&*]/.test(pass);  // At least one special

    // Update rule indicators
    ruleLength.className = hasLength ? 'rule valid' : 'rule';
    ruleUpper.className = hasUpper ? 'rule valid' : 'rule';
    ruleLower.className = hasLower ? 'rule valid' : 'rule';
    ruleNumber.className = hasNumber ? 'rule valid' : 'rule';
    ruleSpecial.className = hasSpecial ? 'rule valid' : 'rule';

    // Calculate strength (count passed rules)
    const score = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    // Update strength bar
    if (score <= 2) {
        strengthBar.className = 'strength-bar weak';
    } else if (score <= 4) {
        strengthBar.className = 'strength-bar medium';
    } else {
        strengthBar.className = 'strength-bar strong';
    }
});


// ============================================
// TOPIC 3: Complete Registration Form
// ============================================
// Validate entire form on submit

const registerForm = document.querySelector('#register-form');
const formOutput = document.querySelector('#form-output');

registerForm.addEventListener('submit', (e) => {
    // Prevent form from actually submitting
    e.preventDefault();

    const name = document.querySelector('#reg-name').value.trim();
    const email = document.querySelector('#reg-email').value.trim();
    const password = document.querySelector('#reg-password').value;
    const confirm = document.querySelector('#reg-confirm').value;

    const errors = [];

    // Validate name
    if (name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email');
    }

    // Validate password
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    // Validate password match
    if (password !== confirm) {
        errors.push('Passwords do not match');
    }

    // Show result
    if (errors.length > 0) {
        formOutput.textContent = 'Errors:\n• ' + errors.join('\n• ');
        formOutput.className = 'output error';
    } else {
        formOutput.textContent = `Registration successful!\n\nName: ${name}\nEmail: ${email}`;
        formOutput.className = 'output success';
    }
});


// ============================================
// TOPIC 4: Input Formatting
// ============================================
// Auto-format input as user types

const cardInput = document.querySelector('#card-number');
const cardDisplay = document.querySelector('#card-display');
const phoneInput = document.querySelector('#phone');

// Credit card: Add space every 4 digits
cardInput.addEventListener('input', (e) => {
    // Remove all non-digits
    let value = e.target.value.replace(/\D/g, '');

    // Limit to 16 digits
    value = value.substring(0, 16);

    // Add space every 4 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim();

    // Update input
    e.target.value = value;

    // Update preview
    cardDisplay.textContent = value || '•••• •••• •••• ••••';
});

// Phone: Format as (123) 456-7890
phoneInput.addEventListener('input', (e) => {
    // Remove all non-digits
    let value = e.target.value.replace(/\D/g, '');

    // Limit to 10 digits
    value = value.substring(0, 10);

    // Format as (123) 456-7890
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }

    e.target.value = value;
});


console.log('Part 6 loaded! Study the code above, then try the exercises below.');


// ============================================
// ============================================
// SELF-PRACTICE EXERCISES
// ============================================
// ============================================

/*
EXERCISE 1: Validate Age Input
------------------------------
Add validation to check that age is between 1 and 120.
Show error message if invalid.

HTML needed:
<input type="number" id="age" placeholder="Your age">
<div class="error-msg" id="age-error">Age must be 1-120</div>

const ageInput = document.querySelector('#age');
ageInput.addEventListener('input', () => {
    // Your code here
});
*/


/*
EXERCISE 2: Create a Username Validator
---------------------------------------
Username rules:
- 3-20 characters
- Only letters, numbers, and underscores
- Must start with a letter

Regex hint: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/

function validateUsername(username) {
    // Your code here
    // Return true if valid, false if not
}
*/


/*
EXERCISE 3: Date Formatter
--------------------------
Format date input as MM/DD/YYYY as user types.
Example: User types "12252023" -> shows "12/25/2023"

dateInput.addEventListener('input', (e) => {
    // Your code here
});
*/
