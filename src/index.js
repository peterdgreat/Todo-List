import Tasks from './tasks.js';
import './style.css';

let id = 0;
const tasksData = [new Tasks('Watch Movie', false, id += 1), new Tasks('Read a book', true, id += 1), new Tasks('Practice Algorithms', false, id += 1)];

const showTasks = (() => {
  const tasksList = document.querySelector('.tasks');
  tasksData.forEach((task) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = task.completed;
    input.addEventListener('change', () => {
      task.completed = input.checked;
      if (task.completed === true) {
        li.classList.add('completed');
      }
    });
    li.appendChild(input);

    const description = document.createElement('p');
    description.innerText = task.description;
    li.appendChild(description);

    const more = document.createElement('span');
    more.classList.add('material-icons');
    more.innerText = 'more_vert';
    li.appendChild(more);

    li.classList.add('d-flex', 'justify-content-between', 'border-m');
    tasksList.appendChild(li);
    console.log(task.index);
  });
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerText = 'Clear all completed';
  li.appendChild(p);
  li.classList.add('d-flex', 'justify-content-around', 'bg');
  tasksList.appendChild(li);
});
window.onload = () => {
  showTasks();
};