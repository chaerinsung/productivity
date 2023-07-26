document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addButton = document.getElementById('addButton');
  const taskList = document.getElementById('taskList');

  // Load tasks from local storage on page load
  loadTasks();

  addButton.addEventListener('click', addTask);
  taskList.addEventListener('click', deleteTask);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <button class="delete-button">Delete</button>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';

    // Save tasks to local storage
    saveTasks();
  }

  function deleteTask(event) {
    if (event.target.classList.contains('delete-button')) {
      const taskItem = event.target.parentElement;
      taskList.removeChild(taskItem);

      // Save tasks to local storage
      saveTasks();
    }
  }

  function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');

    taskItems.forEach((taskItem) => {
      tasks.push(taskItem.firstChild.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((taskText) => {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-button">Delete</button>
      `;

      taskList.appendChild(taskItem);
    });
  }
});
