let tasks = [];

 function fun() {
    if(localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    renderTasks();
};

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if(taskText !== '') {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    } else {
        alert("Please enter a task!");
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function editTask(index) {
    const newTask = prompt("Edit the task:", tasks[index]);
    if(newTask !== null) {
        tasks[index] = newTask.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    if(confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
