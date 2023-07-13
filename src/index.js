import './style.css';
import { addTask, remove } from './crud.js';

const taskList = [];

const { localStorage } = window;

const taskContainer = document.querySelector('.task-container');

// display
const display = () => {
  const data = JSON.parse(localStorage.getItem('taskList'));
  const arr = [];
  const newData = [];
  data.forEach((task) => {
    arr.push(task.index);
  });

  arr.sort((a, b) => a - b);

  for (let i = 0; i < arr.length; i += 1) {
    data.forEach((task) => {
      if (arr[i] === task.index) {
        task.index = i;
        newData.push(task);
      }
    });
  }
  localStorage.setItem('taskList', JSON.stringify(newData));
  taskContainer.innerHTML = '';
  newData.forEach((task) => {
    const elem = `
    
      <div class="left">
        <input type="checkbox" id="task-${task.index}" name="task" value="${task.description}">
        <div class="content" contentEditable="true">
          <label for="task-${task.index}"> ${task.description}</label>
        </div>
      </div>
      <span class="material-symbols-sharp">
        more_vert
      </span>
    
  `;

    const currentTask = document.createElement('div');
    currentTask.setAttribute('class', 'task');
    currentTask.setAttribute('data-index', task.index);
    currentTask.innerHTML = elem;
    taskContainer.appendChild(currentTask);
  });
};

const AllEventHandler = () => {
  const allTasks = taskContainer.querySelectorAll('.task');

  if (allTasks.length !== 0) {
    allTasks.forEach((tsk) => {
      const content = tsk.querySelector('.content');

      content.addEventListener('click', () => {
        allTasks.forEach((tsks) => {
          tsks.style.backgroundColor = '#fff';
          tsks.getElementsByTagName('span')[0].textContent = 'more_vert';
        });

        document.addEventListener('click', (event) => {
          const isClickInsideDiv = taskContainer.contains(event.target);
          if (!isClickInsideDiv) {
            tsk.style.backgroundColor = '#fff';
            tsk.getElementsByTagName('span')[0].textContent = 'more_vert';
          }
        });
        tsk.style.backgroundColor = '#E3E2AE';
        tsk.getElementsByTagName('span')[0].textContent = 'delete';
      });
      content.addEventListener('focus', () => {
        content.style.outline = 'none';
      });
    });
  }
};

// display tasks when page load
window.addEventListener('load', () => {
  const data = JSON.parse(localStorage.getItem('taskList'));
  if (data) {
    display();
    AllEventHandler();
  }
});

// add new task
const addBtn = document.querySelector('.add-task span');
const taskInput = document.querySelector('#addTask');

const eventHandler = (e) => {
  if (e.key === 'Enter' || e.type === 'click') {
    addTask(taskList, localStorage);
    display();
    AllEventHandler();
  }
};

addBtn.addEventListener('click', eventHandler);
taskInput.addEventListener('keydown', eventHandler);

// remove
const removeObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    const data = JSON.parse(localStorage.getItem('taskList'));
    if (mutation !== null) {
      const btn = mutation.target;

      if (btn.textContent === 'delete') {
        btn.addEventListener('click', () => {
          remove(data, localStorage, btn);
          display();
          AllEventHandler();
        });
      }
    }
  });
});

removeObserver.observe(taskContainer, { childList: true, subtree: true });

// edit

const editObserve = new MutationObserver(() => {
  const tasks = taskContainer.querySelectorAll('.task');
  tasks.forEach((task) => {
    const data = JSON.parse(localStorage.getItem('taskList'));

    const content = task.querySelector('.left .content');
    const label = content.querySelector('label');

    content.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        data.forEach((tsk) => {
          if (parseInt(tsk.index, 10) === parseInt(task.getAttribute('data-index'), 10)) {
            tsk.description = label.nodeValue;
            
          }
        });

        localStorage.setItem('taskList', JSON.stringify(data));
        display();
        AllEventHandler();
      }
    });
  });
});

editObserve.observe(taskContainer, { childList: true });
