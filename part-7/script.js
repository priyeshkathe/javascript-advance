/**
 * Part 7: Working with APIs (CRUD Operations)
 *
 * Learn:
 * - GET: Read/fetch data
 * - POST: Create new data
 * - PUT: Replace entire resource
 * - PATCH: Update some fields
 * - DELETE: Remove data
 * - Debouncing for search
 * - Pagination
 */

console.log('=== Part 7: Working with APIs ===');

const API = 'https://jsonplaceholder.typicode.com';
let allUsers = [];


// ============================================
// TOPIC 1: Display API Data
// ============================================

const loadUsersBtn = document.querySelector('#load-users-btn');
const clearBtn = document.querySelector('#clear-btn');
const usersLoading = document.querySelector('#users-loading');
const usersGrid = document.querySelector('#users-grid');

loadUsersBtn.addEventListener('click', async () => {
    usersLoading.style.display = 'block';
    usersGrid.innerHTML = '';

    try {
        const response = await fetch(`${API}/users`);
        const users = await response.json();
        allUsers = users;  // Save for search

        usersLoading.style.display = 'none';

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h4>${user.name}</h4>
                <p>@${user.username}</p>
                <p>${user.email}</p>
                <p>${user.address.city}</p>
            `;
            usersGrid.appendChild(card);
        });
    } catch (error) {
        usersLoading.style.display = 'none';
        usersGrid.innerHTML = `<div class="output error">Error: ${error.message}</div>`;
    }
});

clearBtn.addEventListener('click', () => {
    usersGrid.innerHTML = '';
});


// ============================================
// TOPIC 2: POST - Create New Data
// ============================================
// POST sends data to create a new resource

const postTitle = document.querySelector('#post-title');
const postBody = document.querySelector('#post-body');
const createBtn = document.querySelector('#create-btn');
const postOutput = document.querySelector('#post-output');

createBtn.addEventListener('click', async () => {
    const title = postTitle.value.trim();
    const body = postBody.value.trim();

    if (!title || !body) {
        postOutput.textContent = 'Please fill both fields';
        postOutput.className = 'output error';
        return;
    }

    postOutput.textContent = 'Creating...';

    try {
        const response = await fetch(`${API}/posts`, {
            method: 'POST',  // HTTP method
            headers: {
                'Content-Type': 'application/json'  // Tell server we're sending JSON
            },
            body: JSON.stringify({  // Convert object to JSON string
                title: title,
                body: body,
                userId: 1
            })
        });

        const data = await response.json();

        postOutput.textContent = `Created successfully!\n\n${JSON.stringify(data, null, 2)}`;
        postOutput.className = 'output success';

    } catch (error) {
        postOutput.textContent = 'Error: ' + error.message;
        postOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 3: PUT vs PATCH
// ============================================
// PUT - Replaces the entire resource
// PATCH - Updates only specified fields

const updateTitle = document.querySelector('#update-title');
const putBtn = document.querySelector('#put-btn');
const patchBtn = document.querySelector('#patch-btn');
const updateOutput = document.querySelector('#update-output');

// PUT - Replace entire resource
putBtn.addEventListener('click', async () => {
    const title = updateTitle.value.trim();
    if (!title) {
        updateOutput.textContent = 'Enter a title';
        return;
    }

    updateOutput.textContent = 'Updating with PUT...';

    const response = await fetch(`${API}/posts/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: 1,
            title: title,
            body: 'New body (PUT replaces everything)',
            userId: 1
        })
    });

    const data = await response.json();
    updateOutput.textContent = `PUT Response:\n${JSON.stringify(data, null, 2)}`;
    updateOutput.className = 'output success';
});

// PATCH - Update only some fields
patchBtn.addEventListener('click', async () => {
    const title = updateTitle.value.trim();
    if (!title) {
        updateOutput.textContent = 'Enter a title';
        return;
    }

    updateOutput.textContent = 'Updating with PATCH...';

    const response = await fetch(`${API}/posts/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title  // Only update title, keep other fields
        })
    });

    const data = await response.json();
    updateOutput.textContent = `PATCH Response:\n${JSON.stringify(data, null, 2)}`;
    updateOutput.className = 'output success';
});


// ============================================
// TOPIC 4: DELETE
// ============================================

const deleteId = document.querySelector('#delete-id');
const deleteBtn = document.querySelector('#delete-btn');
const deleteOutput = document.querySelector('#delete-output');

deleteBtn.addEventListener('click', async () => {
    const id = deleteId.value;
    if (!id) {
        deleteOutput.textContent = 'Enter an ID';
        return;
    }

    deleteOutput.textContent = 'Deleting...';

    const response = await fetch(`${API}/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        deleteOutput.textContent = `Deleted post ${id} successfully!\nStatus: ${response.status}`;
        deleteOutput.className = 'output success';
    } else {
        deleteOutput.textContent = `Failed to delete. Status: ${response.status}`;
        deleteOutput.className = 'output error';
    }
});


// ============================================
// TOPIC 5: Search with Debouncing
// ============================================
// Debounce: Wait for user to stop typing before searching

const searchInput = document.querySelector('#search-input');
const searchOutput = document.querySelector('#search-output');
const searchResults = document.querySelector('#search-results');

let searchTimeout;  // Store timeout ID

searchInput.addEventListener('input', () => {
    // Clear previous timeout
    clearTimeout(searchTimeout);

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        searchOutput.textContent = 'Type to search...';
        searchResults.innerHTML = '';
        return;
    }

    searchOutput.textContent = 'Waiting for you to stop typing...';

    // Set new timeout - only search after 300ms of no typing
    searchTimeout = setTimeout(async () => {
        searchOutput.textContent = 'Searching...';

        // Load users if not already loaded
        if (allUsers.length === 0) {
            const response = await fetch(`${API}/users`);
            allUsers = await response.json();
        }

        // Filter users
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );

        searchOutput.textContent = `Found ${filtered.length} user(s)`;

        searchResults.innerHTML = filtered.map(user => `
            <div class="user-card">
                <h4>${user.name}</h4>
                <p>${user.email}</p>
            </div>
        `).join('');

    }, 300);  // 300ms debounce delay
});


// ============================================
// TOPIC 6: Pagination
// ============================================
// Load data in chunks using _page and _limit

const loadPostsBtn = document.querySelector('#load-posts-btn');
const loadMoreBtn = document.querySelector('#load-more-btn');
const postsContainer = document.querySelector('#posts-container');

let currentPage = 1;
const postsPerPage = 5;

async function loadPosts(append = false) {
    if (!append) {
        postsContainer.innerHTML = '<div class="loading">Loading...</div>';
        currentPage = 1;
    }

    const response = await fetch(`${API}/posts?_page=${currentPage}&_limit=${postsPerPage}`);
    const posts = await response.json();

    if (!append) {
        postsContainer.innerHTML = '';
    }

    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-item';
        div.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
        postsContainer.appendChild(div);
    });

    // Show "Load More" if we got full page of results
    loadMoreBtn.style.display = posts.length === postsPerPage ? 'inline-block' : 'none';
}

loadPostsBtn.addEventListener('click', () => loadPosts(false));

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    loadPosts(true);
});


console.log('Part 7 loaded! Study the code above, then try the exercises below.');


// ============================================
// ============================================
// SELF-PRACTICE EXERCISES
// ============================================
// ============================================

/*
EXERCISE 1: Create a Comment
----------------------------
Use POST to create a new comment.
API: https://jsonplaceholder.typicode.com/comments

Body should include: postId, name, email, body

async function createComment(postId, name, email, body) {
    // Your code here
}
*/


/*
EXERCISE 2: What's the Difference?
----------------------------------
Explain the difference between PUT and PATCH:

PUT: _______________
PATCH: _______________

When would you use PUT? _______________
When would you use PATCH? _______________
*/


/*
EXERCISE 3: Implement Debounce Function
---------------------------------------
Create a reusable debounce function.

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        // Your code here
    };
}

// Usage:
const debouncedSearch = debounce((query) => {
    console.log('Searching:', query);
}, 300);
*/
