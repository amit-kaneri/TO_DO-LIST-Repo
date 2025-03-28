document.getElementById('notes-btn').addEventListener('click', () => {
    showSection('notes');
    togglePlusButton(true);
});

document.getElementById('todo-btn').addEventListener('click', () => {
    showSection('todo');
    togglePlusButton(true);
});

function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(`${section}-section`).style.display = 'block';
}

function togglePlusButton(show) {
    const plusButton = document.getElementById('floating-btn');
    if (show) {
        plusButton.style.display = 'flex';
    } else {
        plusButton.style.display = 'none';
    }
}

function openPopup() {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-content').innerHTML = `
        <button onclick="showPopupContent('notes')">Note</button>
        <button onclick="showPopupContent('todo')">To-Do List</button>
     `;
}

function showPopupContent(type) {
    let content;
    if (type === 'notes') {
        content = `
            <h3>Add Note</h3>
            <textarea id="note-text" rows="4" placeholder="Enter your note here..."></textarea>
            <button onclick="saveNote()">Submit</button>
        `;
    } else if (type === 'todo') {
        content = `
            <h3>Add To-Do</h3>
            <input type="text" id="todo-text" placeholder="Enter your task here...">
            <input type="date" id="todo-date">
            <button onclick="saveTask()">Save</button>
        `;
    }
    document.getElementById('popup-content').innerHTML = content;
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function saveNote() {
    const noteText = document.getElementById('note-text').value;
    if (noteText.trim()) {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML += `
            <div class="note">
                <p>${noteText}</p>
                <button onclick="editNote(this)">Edit</button>
                <button onclick="deleteNote(this)">Delete</button>
            </div>
        `;
        closePopup();
    } else {
        alert('Please enter a note.');
    }
}

function saveTask() {
    const taskText = document.getElementById('todo-text').value;
    const taskDate = document.getElementById('todo-date').value;
    if (taskText.trim()) {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML += `
            <div class="todo-item">
                <p>${taskText} <span>${taskDate}</span></p>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        closePopup();
    } else {
        alert('Please enter a task.');
    }
}

function deleteNote(button) {
    if (confirm('Are you sure you want to delete this note?')) {
        button.parentElement.remove();
    }
}

function editNote(button) {
    const note = button.parentElement.querySelector('p');
    const newText = prompt('Edit your note:', note.textContent);
    if (newText !== null) {
        note.textContent = newText;
    }
}

function deleteTask(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        button.parentElement.remove();
    }
}

function editTask(button) {
    const task = button.parentElement.querySelector('p');
    const newText = prompt('Edit your task:', task.childNodes[0].nodeValue);
    if (newText !== null) {
        task.childNodes[0].nodeValue = newText;
    }
}







