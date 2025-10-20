// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Select DOM Elements ---
    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- 2. Initialize Tasks Array ---
    // Try to load tasks from localStorage, or start with an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- 3. Function to Save Tasks to LocalStorage ---
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // --- 4. Function to Render All Tasks ---
    // This function redraws the entire list based on the 'tasks' array
    function renderTasks() {
        // Clear the existing list
        taskList.innerHTML = '';

        // Loop through each task and create the HTML for it
        tasks.forEach((task, index) => {
            // Create a new list item (li)
            const li = document.createElement('li');

            // Add the 'completed' class if the task is done
            if (task.completed) {
                li.classList.add('completed');
            }

            // Create a span to hold the task text
            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            
            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';

            // Add 'data-index' attributes to know which task to act on
            li.dataset.index = index;
            taskSpan.dataset.index = index;
            deleteButton.dataset.index = index;

            // Append the span and button to the list item
            li.appendChild(taskSpan);
            li.appendChild(deleteButton);

            // Append the list item to the task list (ul)
            taskList.appendChild(li);
        });
    }

    // --- 5. Event Listener for Form Submission (Adding a Task) ---
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            // Create a new task object
            const newTask = {
                text: taskText,
                completed: false
            };
            
            // Add the new task to our array
            tasks.push(newTask);
            
            // Save and re-render the list
            saveTasks();
            renderTasks();
            
            taskInput.value = '';
            taskInput.focus();
        }
    });

    // --- 6. Event Listener for Clicks on the Task List (Completing or Deleting) ---
    taskList.addEventListener('click', (event) => {
        const clickedElement = event.target;
        
        // Get the index of the task from the 'data-index' attribute
        const taskIndex = clickedElement.dataset.index;

        // Ensure a valid task was clicked
        if (taskIndex === undefined) {
            return;
        }

        // Check if the delete button was clicked
        if (clickedElement.classList.contains('delete-btn')) {
            // Remove the task from the array using its index
            tasks.splice(taskIndex, 1);
        }

        // Check if the task text (span) was clicked to toggle completion
        if (clickedElement.tagName === 'SPAN') {
            // Toggle the 'completed' status in the array
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
        }

        // Save the updated array and re-render the list
        saveTasks();
        renderTasks();
    });

    // --- 7. Initial Render ---
    // Render any tasks that were loaded from localStorage
    renderTasks();
});