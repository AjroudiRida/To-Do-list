const addTask = (taskList, localStorage) => {
  let data = [];
  if (localStorage.getItem('taskList')) {
    data = JSON.parse(localStorage.getItem('taskList'));
  } else {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    data = JSON.parse(localStorage.getItem('taskList'));
  }
  const description = document.querySelector('#addTask').value;
  const newIndex = data.length === 0 ? 0 : data.length;

  const task = {
    description,
    completed: false,
    index: newIndex,
  };

  data.push(task);
  localStorage.setItem('taskList', JSON.stringify(data));
  document.querySelector('#addTask').value = '';
};

const remove = (data, localStorage, btn) => {
  const newArr = data.filter((item) => item.index !== parseInt(btn.parentNode.getAttribute('data-index'), 10));
  localStorage.setItem('taskList', JSON.stringify(newArr));
};

export { addTask, remove };