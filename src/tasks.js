import Crud from './crud';
import './style.css';

const crud = new Crud();
const refresh = document.querySelector('.refresh');
const ul = document.querySelector('.tasks');
const deleteAll = document.querySelector('.delete-all');
export default class Tasks {
  static statusChanges(li) {
    if (crud.completed === true) {
      li.classList.add('completed');
      crud.completed = true;
    } else {
      li.classList.remove('completed');
      crud.completed = false;
    }
  }

  static showTasks() {
    ul.innerHTML = '';
    Crud.tasks.forEach((task) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = task.completed;
      if (task.completed === true) {
        li.classList.add('completed');
        li.classList.remove('bg-col');
      } else {
        li.classList.remove('completed');
      }
      input.addEventListener('change', () => {
        task.completed = input.checked;
        Tasks.statusChanges(li);
        if (task.completed === true) {
          li.classList.add('completed');
        }
        // Tasks.setLocal();
      });
      li.appendChild(input);

      const description = document.createElement('p');
      description.innerText = task.description;
      li.appendChild(description);

      const more = document.createElement('span');
      more.classList.add('material-icons');
      more.innerText = 'more_vert';
      li.appendChild(more);

      li.classList.add('d-flex', 'justify-content-between', 'border-m', 'align-items-center', 'text-center', 'descr');

      li.addEventListener('dblclick', () => {
        // edit task off selected id
        li.classList.add('bg-col');
        description.classList.add('desc');
        Tasks.editTask(task.index);

        // remove class edit
        more.innerText = 'delete';
        more.addEventListener('click', () => {
          // delete selected item from dom
          ul.removeChild(li);
          Crud.deleteTask(task.index);
          Crud.setLocal();
        });
      });
      ul.appendChild(li);
    });
  }

  static editTask(index) {
    // const li = document.querySelector(`li:nth-child(${index})`);
    const description = document.querySelectorAll('p');
    description.forEach((desc) => {
      desc.setAttribute('contenteditable', 'true');
      desc.addEventListener('blur', () => {
        desc.setAttribute('contenteditable', 'false');
        Crud.tasks[index - 1].description = desc.innerText;
        desc.setAttribute('contenteditable', 'false');
        desc.classList.remove('bg-col');
        Crud.setLocal();
        Tasks.showTasks();
      });
      desc.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          desc.setAttribute('contenteditable', 'false');
          Crud.tasks[index - 1].description = desc.innerText;
          desc.classList.remove('bg-col');
          Crud.setLocal();
          Tasks.showTasks();
        }
      });
    });
  }

  static deleteCompleted() {
    const domStay = document.querySelectorAll('.completed');
    const stay = Crud.tasks.filter((task) => task.completed === false);
    Crud.tasks = stay;
    domStay.forEach((domEl) => {
      domEl.remove();
    });
    Crud.setLocal();
  }
}
const liC = document.createElement('li');
const p = document.createElement('h5');
p.innerText = 'Clear all completed';
liC.appendChild(p);
liC.classList.add('d-flex', 'justify-content-around', 'bg', 'cursor');
liC.addEventListener('click', () => {
  Tasks.deleteCompleted();
});
deleteAll.appendChild(liC);

refresh.addEventListener('click', () => {
  Crud.deleteAllTasks();
  ul.innerHTML = '';
});