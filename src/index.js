import Tasks from './tasks.js';
import './style.css';

let id = 0;
const addValue = document.querySelector('.add-value');
addValue.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // remove all repeated tasks
    const newTask = new Tasks(addValue.value, false, id += 1);
    newTask.addTasks();
    addValue.value = '';
  }
});

window.onload = () => {
  Tasks.getLocal();
};