

// Add your JavaScript code here
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to fetch all tasks from the server and update the UI
function getTasks() {
    axios.get('http://localhost:3000/tasks')
        .then(response => {
            const tasks = response.data;
            taskList.innerHTML = tasks.map(task => `<li>${task.description} <button onclick="deleteTask(${task.id})">Delete</button></li>`).join('');
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}

// Function to add a new task
function addTask() {
    const description = taskInput.value;
    if (!description) {
        return;
    }

    axios.post('http://localhost:3000/tasks', { description })
        .then(() => {
            taskInput.value = '';
            getTasks(); // Refresh the task list after adding a new task
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
}

// Function to delete a task
function deleteTask(id) {
    axios.delete(`http://localhost:3000/tasks/${id}`)
        .then(() => {
            getTasks(); // Refresh the task list after deleting a task
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
}

// Initial load: Fetch tasks from the server and update the UI
getTasks();
