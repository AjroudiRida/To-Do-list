const statusUpdate = (taskContainer) => {
  const tasks = taskContainer.querySelectorAll('.task');
  const data = JSON.parse(localStorage.getItem('taskList'));
  tasks.forEach((task) => {
    const check = task.querySelector('.left .checkbox');
    const content = task.querySelector('.left .content');
    check.addEventListener('change', (e) => {
      if (e.target.checked) {
        content.style.textDecoration = 'line-through';
        data.forEach((tsk) => {
          if (parseInt(tsk.index, 10) === parseInt(task.getAttribute('data-index'), 10)) {
            tsk.completed = true;
            localStorage.setItem('taskList', JSON.stringify(data));
          }
        });
      } else {
        content.style.textDecoration = 'none';
        check.style.display = 'inline-block';
        data.forEach((tsk) => {
          if (parseInt(tsk.index, 10) === parseInt(task.getAttribute('data-index'), 10)) {
            tsk.completed = false;
            localStorage.setItem('taskList', JSON.stringify(data));
          }
        });
      }
    });
  });
};

const clearAll = (taskContainer) => {
  const tasks = taskContainer.querySelectorAll('.task');
  let data = JSON.parse(localStorage.getItem('taskList'));

  tasks.forEach((task) => {
    const check = task.querySelector('.left .checkbox');
    if (check.checked) {
      const newArr = data.filter((item) => item.index !== parseInt(task.getAttribute('data-index'), 10));
      data = newArr;
      localStorage.setItem('taskList', JSON.stringify(newArr));
    }
  });
};

export { statusUpdate, clearAll };