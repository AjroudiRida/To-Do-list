import './style.css';

const taskList = [{
  description: 'wash the dishes',
  completed: false,
  index: 2,
},
{
  description: 'complete to Do list project',
  completed: false,
  index: 1,
},
{
  description: 'create a web site',
  completed: false,
  index: 4,
},
];

const { localStorage } = window;
localStorage.setItem('taskList', JSON.stringify(taskList));

// display
const display = () => {
  const data = JSON.parse(localStorage.getItem('taskList'));
  const taskContainer = document.querySelector('.task-container');
  data.forEach((task) => {
    const elem = `
    
      <div class="left">
      <input type="checkbox" id="task-${task.index}" name="task" value="${task.description}">
      <label for="task-${task.index}"> ${task.description}</label>
      </div>
      <span class="material-symbols-sharp">
        more_vert
      </span>
    
  `;

    const currentTask = document.createElement('div');
    currentTask.setAttribute('class', 'task');
    currentTask.innerHTML = elem;
    taskContainer.appendChild(currentTask);
  });
};

window.addEventListener('load', () => {
  const data = JSON.parse(localStorage.getItem('taskList'));
  const arr = [];
  const newData = [];
  taskList.forEach((task) => {
    arr.push(task.index);
  });

  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i += 1) {
    data.forEach((task) => {
      if (arr[i] === task.index) {
        newData.push(task);
      }
    });
  }
  localStorage.setItem('taskList', JSON.stringify(newData));
  display();
});