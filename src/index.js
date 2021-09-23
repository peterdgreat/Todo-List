import Tasks from './tasks.js';
import './style.css';

let id = 0;

let tasksData = [new Tasks('Watch Movie', false, id += 1), new Tasks('Read a book', true, id += 1), new Tasks('Practice Algorithms', false, id += 1)];
const setLocal = (() => {
  localStorage.setItem('tasks', JSON.stringify(tasksData));
});

// eslint-disable-next-line consistent-return
const showTasks = (() => {
  const tasksList = document.querySelector('.tasks');
  if (tasksData === null) {
    return null;
  }
  tasksData.forEach((task) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = task.completed;
    if (task.completed === true) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
    input.addEventListener('change', () => {
      task.completed = input.checked;
      if (task.completed === true) {
        li.classList.add('completed');
        task.completed = true;
      } else {
        li.classList.remove('completed');
        task.completed = false;
      }
      setLocal();
    });
    li.appendChild(input);

    const description = document.createElement('p');
    description.innerText = task.description;
    li.appendChild(description);

    const more = document.createElement('span');
    more.classList.add('material-icons');
    more.innerText = 'more_vert';
    li.appendChild(more);

    li.classList.add('d-flex', 'justify-content-between', 'border-m', 'align-items-center', 'text-center');
    tasksList.appendChild(li);
  });
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerText = 'Clear all completed';
  li.appendChild(p);
  li.classList.add('d-flex', 'justify-content-around', 'bg');
  tasksList.appendChild(li);
  console.log(tasksData);
});

function getLocal() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks !== null) {
    tasksData = storedTasks;
  }
}

window.onload = () => {
  getLocal();
  showTasks();
};