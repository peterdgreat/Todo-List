import Crud from './crud';
import Tasks from './tasks';
import './style.css';

let id = 0;
const addValue = document.querySelector('.add-value');
addValue.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // remove all repeated tasks
    const newTask = new Crud(addValue.value, false, id += 1);
    newTask.addTasks();
    Tasks.showTasks();
    addValue.value = '';
  }
});

window.onload = () => {
  Crud.getLocal();
  Tasks.showTasks();
};