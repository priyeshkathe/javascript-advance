/**
 * Advance 5: Final Project - Notes App
 *
 * Combines ALL concepts learned:
 * - DOM manipulation
 * - Event handling
 * - Local Storage
 * - Error handling
 * - Search & filter
 */

console.log('=== Advance 5: Notes App ===');

// ============================================
// TOPIC 1: STATE & STORAGE
// ============================================

let notes = [];
let selectedNoteId = null;
let selectedColor = '#fff9c4';
let darkMode = false;

const STORAGE_KEY = 'notesApp_notes';
const THEME_KEY = 'notesApp_darkMode';

function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) notes = JSON.parse(saved);
}


// ============================================
// TOPIC 2: DOM ELEMENTS
// ============================================

const formTitle = document.querySelector('#form-title');
const noteTitle = document.querySelector('#note-title');
const noteContent = document.querySelector('#note-content');
const noteCategory = document.querySelector('#note-category');
const colorOptions = document.querySelectorAll('.color-option');
const saveBtn = document.querySelector('#save-btn');
const clearBtn = document.querySelector('#clear-btn');
const deleteBtn = document.querySelector('#delete-btn');
const titleCount = document.querySelector('#title-count');
const contentCount = document.querySelector('#content-count');

const notesContainer = document.querySelector('#notes-container');
const noteCountDisplay = document.querySelector('#note-count');

const searchInput = document.querySelector('#search-input');
const filterCategory = document.querySelector('#filter-category');
const sortBy = document.querySelector('#sort-by');

const totalNotesDisplay = document.querySelector('#total-notes');
const thisWeekDisplay = document.querySelector('#this-week');
const categoriesUsedDisplay = document.querySelector('#categories-used');
const pinnedCountDisplay = document.querySelector('#pinned-count');

const toastContainer = document.querySelector('#toast-container');

const darkModeBtn = document.querySelector('#dark-mode-btn');
const exportBtn = document.querySelector('#export-btn');
const importBtn = document.querySelector('#import-btn');
const importFile = document.querySelector('#import-file');
const pinBtn = document.querySelector('#pin-btn');
const clearAllBtn = document.querySelector('#clear-all-btn');


// ============================================
// TOPIC 3: TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}


// ============================================
// TOPIC 4: NOTE OPERATIONS (CRUD)
// ============================================

function createNote(title, content, category, color) {
    if (!title.trim()) throw new Error('Title required');
    if (!content.trim()) throw new Error('Content required');

    const note = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        category,
        color,
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    notes.unshift(note);
    saveNotes();
    return note;
}

function updateNote(id, updates) {
    const note = notes.find(n => n.id === id);
    if (!note) throw new Error('Note not found');

    Object.assign(note, updates, { updatedAt: new Date().toISOString() });
    saveNotes();
    return note;
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
}


// ============================================
// TOPIC 5: RENDER NOTES
// ============================================

function renderNotes() {
    const filtered = getFilteredNotes();
    noteCountDisplay.textContent = `${filtered.length} note(s)`;
    notesContainer.innerHTML = '';

    if (filtered.length === 0) {
        notesContainer.innerHTML = '<div class="empty-state"><p>No notes found</p></div>';
        updateStats();
        return;
    }

    filtered.forEach(note => {
        const card = document.createElement('div');
        card.className = `note-card ${note.id === selectedNoteId ? 'selected' : ''} ${note.pinned ? 'pinned' : ''}`;
        card.style.backgroundColor = note.color;
        card.innerHTML = `
            <h4>${escapeHtml(note.title)}</h4>
            <p>${escapeHtml(note.content)}</p>
            <div class="note-meta">
                <span class="note-category">${note.category}</span>
                <span>${formatDate(new Date(note.updatedAt))}</span>
            </div>
            <div class="note-actions">
                <button class="btn-secondary" onclick="selectNote(${note.id})">Edit</button>
                <button class="btn-danger" onclick="handleDelete(${note.id})">Delete</button>
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (!e.target.matches('button')) selectNote(note.id);
        });
        notesContainer.appendChild(card);
    });

    updateStats();
}

function getFilteredNotes() {
    let result = [...notes];
    const query = searchInput.value.trim().toLowerCase();
    const category = filterCategory.value;

    if (query) {
        result = result.filter(n =>
            n.title.toLowerCase().includes(query) ||
            n.content.toLowerCase().includes(query)
        );
    }

    if (category !== 'all') {
        result = result.filter(n => n.category === category);
    }

    const sort = sortBy.value;
    if (sort === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'oldest') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));

    // Pinned first
    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return result;
}

function updateStats() {
    totalNotesDisplay.textContent = notes.length;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    thisWeekDisplay.textContent = notes.filter(n => new Date(n.createdAt) > weekAgo).length;

    categoriesUsedDisplay.textContent = new Set(notes.map(n => n.category)).size;
    pinnedCountDisplay.textContent = notes.filter(n => n.pinned).length;
}


// ============================================
// TOPIC 6: FORM HANDLING
// ============================================

function selectNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    selectedNoteId = id;
    noteTitle.value = note.title;
    noteContent.value = note.content;
    noteCategory.value = note.category;
    selectedColor = note.color;

    colorOptions.forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.color === note.color);
    });

    formTitle.textContent = 'Edit Note';
    deleteBtn.style.display = 'inline-block';
    saveBtn.textContent = 'Update Note';

    updateCharCount(noteTitle, titleCount, 50);
    updateCharCount(noteContent, contentCount, 500);
    renderNotes();
}

function clearForm() {
    selectedNoteId = null;
    noteTitle.value = '';
    noteContent.value = '';
    noteCategory.value = 'personal';
    selectedColor = '#fff9c4';

    colorOptions.forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.color === '#fff9c4');
    });

    titleCount.textContent = '0';
    contentCount.textContent = '0';
    formTitle.textContent = 'Create New Note';
    deleteBtn.style.display = 'none';
    saveBtn.textContent = 'Save Note';
    renderNotes();
}

function handleSave() {
    try {
        if (selectedNoteId) {
            updateNote(selectedNoteId, {
                title: noteTitle.value,
                content: noteContent.value,
                category: noteCategory.value,
                color: selectedColor
            });
            showToast('Note updated!');
        } else {
            createNote(noteTitle.value, noteContent.value, noteCategory.value, selectedColor);
            showToast('Note created!');
        }
        clearForm();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

window.handleDelete = function(id = selectedNoteId) {
    if (!id) return;
    if (confirm('Delete this note?')) {
        deleteNote(id);
        showToast('Note deleted');
        clearForm();
    }
};


// ============================================
// TOPIC 7: UTILITY FUNCTIONS
// ============================================

function formatDate(date) {
    const diff = Date.now() - date;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
    return date.toLocaleDateString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateCharCount(input, countEl, max) {
    const count = input.value.length;
    countEl.textContent = count;
    countEl.parentElement.className = 'char-counter' +
        (count >= max * 0.9 ? ' danger' : count >= max * 0.75 ? ' warning' : '');
}

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}


// ============================================
// TOPIC 8: EXPORT/IMPORT
// ============================================

exportBtn.addEventListener('click', () => {
    if (notes.length === 0) {
        showToast('No notes to export', 'error');
        return;
    }

    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notes_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${notes.length} notes!`);
});

importBtn.addEventListener('click', () => importFile.click());

importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (!Array.isArray(imported)) throw new Error('Invalid format');

            if (confirm('Replace all notes with imported data?')) {
                notes = imported;
                saveNotes();
                renderNotes();
                showToast(`Imported ${notes.length} notes!`);
            }
        } catch (error) {
            showToast('Import failed: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
    importFile.value = '';
});


// ============================================
// TOPIC 9: DARK MODE
// ============================================

darkModeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    darkModeBtn.textContent = darkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem(THEME_KEY, JSON.stringify(darkMode));
});

// Load theme on start
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'true') {
    darkMode = true;
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️ Light Mode';
}


// ============================================
// TOPIC 10: PIN NOTES
// ============================================

pinBtn.addEventListener('click', () => {
    if (!selectedNoteId) {
        showToast('Select a note first', 'error');
        return;
    }

    const note = notes.find(n => n.id === selectedNoteId);
    if (note) {
        note.pinned = !note.pinned;
        saveNotes();
        renderNotes();
        showToast(note.pinned ? 'Note pinned!' : 'Note unpinned');
    }
});

clearAllBtn.addEventListener('click', () => {
    if (notes.length === 0) {
        showToast('No notes to clear', 'error');
        return;
    }

    if (confirm(`Delete ALL ${notes.length} notes?`)) {
        notes = [];
        saveNotes();
        clearForm();
        showToast('All notes cleared');
    }
});


// ============================================
// TOPIC 11: EVENT LISTENERS
// ============================================

saveBtn.addEventListener('click', handleSave);
clearBtn.addEventListener('click', clearForm);
deleteBtn.addEventListener('click', () => handleDelete());

colorOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        colorOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedColor = opt.dataset.color;
    });
});

noteTitle.addEventListener('input', () => updateCharCount(noteTitle, titleCount, 50));
noteContent.addEventListener('input', () => updateCharCount(noteContent, contentCount, 500));

noteTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        noteContent.focus();
    }
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
    }
});

const debouncedSearch = debounce(() => renderNotes(), 300);
searchInput.addEventListener('input', debouncedSearch);
filterCategory.addEventListener('change', renderNotes);
sortBy.addEventListener('change', renderNotes);


// ============================================
// TOPIC 12: INITIALIZE
// ============================================

loadNotes();

// Add sample notes if empty
if (notes.length === 0) {
    notes = [
        {
            id: Date.now() - 2000,
            title: 'Welcome to Notes App!',
            content: 'Create, edit, and organize your notes. Try searching, filtering, or pinning notes!',
            category: 'personal',
            color: '#fff9c4',
            pinned: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: Date.now() - 1000,
            title: 'Keyboard Shortcuts',
            content: 'Press Ctrl+S to save. Press Enter in title to jump to content.',
            category: 'work',
            color: '#c8e6c9',
            pinned: false,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString()
        }
    ];
    saveNotes();
}

renderNotes();

console.log('Notes App loaded! Create your first note.');


// ============================================
// ============================================
// SELF-PRACTICE EXERCISES
// ============================================
// ============================================

/*
EXERCISE 1: Add a New Category
------------------------------
Add a new category called "shopping" to the Notes App.

Steps:
1. Find the noteCategory select element in index.html
2. Add a new <option value="shopping">Shopping</option>
3. Also add it to the filterCategory select
4. Test by creating a note with the new category
*/


/*
EXERCISE 2: Change Toast Duration
---------------------------------
Currently toasts disappear after 3 seconds (3000ms).
Change it to 5 seconds.

Find this line in TOPIC 3:
    setTimeout(() => toast.remove(), 3000);

Change 3000 to: _______________
*/


/*
EXERCISE 3: Add a New Keyboard Shortcut
---------------------------------------
Currently Ctrl+S saves the note.
Add a new shortcut: Ctrl+D to toggle dark mode.

Find the keydown event listener in TOPIC 11 and add:

if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    e.preventDefault();
    // Your code to toggle dark mode
}

Hint: Look at how the darkModeBtn click handler works
*/
