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

//return local storage on load
window.onload = () => {
 //get local storage
 Tasks.getLocal();
};