/**
 * Part 3: Fetch API - Getting Data from Servers
 *
 * Learn:
 * - fetch() returns a Promise
 * - response.json() parses JSON
 * - Error handling for network requests
 * - AbortController to cancel requests
 */

console.log('=== Part 3: Fetch API ===');

const API = 'https://jsonplaceholder.typicode.com';


// ============================================
// TOPIC 1: Basic Fetch - GET Request
// ============================================
// fetch(url) returns a Promise
// response.json() also returns a Promise

const fetchUsersBtn = document.querySelector('#fetch-users-btn');
const usersOutput = document.querySelector('#users-output');
const usersContainer = document.querySelector('#users-container');

fetchUsersBtn.addEventListener('click', () => {
    usersOutput.textContent = 'Fetching...';
    usersOutput.className = 'output loading';
    usersContainer.innerHTML = '';

    // fetch returns a Promise
    fetch(`${API}/users`)
        .then(response => {
            // response.json() parses the JSON body
            return response.json();
        })
        .then(users => {
            usersOutput.textContent = `Loaded ${users.length} users!`;
            usersOutput.className = 'output success';

            // Display first 5 users
            users.slice(0, 5).forEach(user => {
                const card = document.createElement('div');
                card.className = 'user-card';
                card.innerHTML = `
                    <h4>${user.name}</h4>
                    <p>@${user.username}</p>
                    <p>${user.email}</p>
                `;
                usersContainer.appendChild(card);
            });
        })
        .catch(error => {
            usersOutput.textContent = 'Error: ' + error.message;
            usersOutput.className = 'output error';
        });
});


// ============================================
// TOPIC 2: Fetch Single Item by ID
// ============================================
// Use template literals to build URLs: `${API}/users/${id}`

const userIdInput = document.querySelector('#user-id');
const fetchSingleBtn = document.querySelector('#fetch-single-btn');
const singleOutput = document.querySelector('#single-output');

fetchSingleBtn.addEventListener('click', async () => {
    const id = userIdInput.value;

    if (!id || id < 1 || id > 10) {
        singleOutput.textContent = 'Enter ID between 1-10';
        singleOutput.className = 'output error';
        return;
    }

    singleOutput.textContent = 'Fetching...';
    singleOutput.className = 'output loading';

    try {
        // Using async/await with fetch
        const response = await fetch(`${API}/users/${id}`);
        const user = await response.json();

        singleOutput.innerHTML = `
<b>Name:</b> ${user.name}
<b>Username:</b> @${user.username}
<b>Email:</b> ${user.email}
<b>Phone:</b> ${user.phone}
<b>City:</b> ${user.address.city}
        `;
        singleOutput.className = 'output success';
    } catch (error) {
        singleOutput.textContent = 'Error: ' + error.message;
        singleOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 3: Fetch with Query Parameters
// ============================================
// Add ?param=value to URL
// ?_limit=5 limits results to 5

const fetchPostsBtn = document.querySelector('#fetch-posts-btn');
const postsOutput = document.querySelector('#posts-output');
const postsContainer = document.querySelector('#posts-container');

fetchPostsBtn.addEventListener('click', async () => {
    postsOutput.textContent = 'Fetching...';
    postsOutput.className = 'output loading';
    postsContainer.innerHTML = '';

    try {
        // ?_limit=5 is a query parameter
        const response = await fetch(`${API}/posts?_limit=5`);
        const posts = await response.json();

        postsOutput.textContent = `Loaded ${posts.length} posts!`;
        postsOutput.className = 'output success';

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            card.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.body}</p>
            `;
            postsContainer.appendChild(card);
        });
    } catch (error) {
        postsOutput.textContent = 'Error: ' + error.message;
        postsOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 4: Error Handling with Fetch
// ============================================
// IMPORTANT: fetch only rejects on network errors
// HTTP errors (404, 500) don't reject - check response.ok

const fetchGoodBtn = document.querySelector('#fetch-good-btn');
const fetchBadBtn = document.querySelector('#fetch-bad-btn');
const errorOutput = document.querySelector('#error-output');

fetchGoodBtn.addEventListener('click', async () => {
    errorOutput.textContent = 'Fetching valid URL...';
    errorOutput.className = 'output loading';

    try {
        const response = await fetch(`${API}/users/1`);

        // Check if response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        errorOutput.textContent = `Success! Got: ${data.name}`;
        errorOutput.className = 'output success';
    } catch (error) {
        errorOutput.textContent = 'Error: ' + error.message;
        errorOutput.className = 'output error';
    }
});

fetchBadBtn.addEventListener('click', async () => {
    errorOutput.textContent = 'Fetching invalid URL...';
    errorOutput.className = 'output loading';

    try {
        const response = await fetch('https://invalid-url-12345.com/data');
        const data = await response.json();
        errorOutput.textContent = JSON.stringify(data);
    } catch (error) {
        // Network error - request couldn't be made
        errorOutput.textContent = 'Network Error: ' + error.message;
        errorOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 5: Cancel Fetch with AbortController
// ============================================
// AbortController lets you cancel ongoing requests

const startFetchBtn = document.querySelector('#start-fetch-btn');
const cancelFetchBtn = document.querySelector('#cancel-fetch-btn');
const abortOutput = document.querySelector('#abort-output');

let controller = null;

startFetchBtn.addEventListener('click', async () => {
    // Create new AbortController
    controller = new AbortController();

    abortOutput.textContent = 'Fetching... Click Cancel to stop!';
    abortOutput.className = 'output loading';

    try {
        const response = await fetch(`${API}/users`, {
            signal: controller.signal  // Pass signal to fetch
        });

        // Simulate slow network
        await new Promise(r => setTimeout(r, 3000));

        const data = await response.json();
        abortOutput.textContent = `Got ${data.length} users!`;
        abortOutput.className = 'output success';
    } catch (error) {
        if (error.name === 'AbortError') {
            abortOutput.textContent = 'Request was cancelled!';
        } else {
            abortOutput.textContent = 'Error: ' + error.message;
        }
        abortOutput.className = 'output error';
    }
});

cancelFetchBtn.addEventListener('click', () => {
    if (controller) {
        controller.abort();  // Cancel the fetch
        controller = null;
    }
});


console.log('Part 3 loaded! Study the code above, then try the exercises below.');

// EXERCISE 1 
async function fetchComments() {
    try {
        const response = await fetch(`${API}/posts/1/comments`);

        if (!response.ok) {
            throw new Error("Failed to fetch comments");
        }

        const comments = await response.json();

        console.log("Total comments:", comments.length);

    } catch (error) {
        console.error("Error:", error.message);
    }
}
fetchComments();

//Exercisee 2 
async function fetchUser999() {
    try {
        const response = await fetch(`${API}/users/999`);

        if (!response.ok) {
            throw new Error(`User not found (Status: ${response.status})`);
        }

        const user = await response.json();
        console.log("User:", user);

    } catch (error) {
        console.error("Handled Error:", error.message);
    }
}
fetchUser999();

//exercise 3
async function fetchBoth() {
    try {
        const [usersRes, postsRes] = await Promise.all([
            fetch(`${API}/users`),
            fetch(`${API}/posts`)
        ]);
        if (!usersRes.ok || !postsRes.ok) {
            throw new Error("Failed to fetch one of the resources");
        }

        const users = await usersRes.json();
        const posts = await postsRes.json();

        console.log("Total Users:", users.length);
        console.log("Total Posts:", posts.length);

    } catch (error) {
        console.error("Error:", error.message);
    }
}
fetchBoth();



