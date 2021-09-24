import './style.css';

// let id = 0;
export default class Tasks {
    static tasks = [];

    constructor(description, completed = false, index = Tasks.tasks.length) {
      this.description = description;
      this.completed = completed;
      this.index = index;
    }

    statusChanges(li) {
      if (this.completed === true) {
        li.classList.add('completed');
        this.completed = true;
      } else {
        li.classList.remove('completed');
        this.completed = false;
      }
    }

    static setLocal() {
      localStorage.setItem('tasks', JSON.stringify(Tasks.tasks));
    }

    static showTasks() {
      const ul = document.querySelector('.tasks');
      ul.innerHTML = '';
      Tasks.tasks.forEach((task) => {
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
          new Tasks().statusChanges(li);
          if (task.completed === true) {
            li.classList.add('completed');
          }
          Tasks.setLocal();
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

        ul.appendChild(li);
      });
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.innerText = 'Clear all completed';
      li.appendChild(p);
      li.classList.add('d-flex', 'justify-content-around', 'bg');
      ul.appendChild(li);
    }

    static getLocal() {
      // get local storage
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        Tasks.tasks = tasks;
      }
      Tasks.showTasks();
    }

    addTasks() {
      Tasks.tasks.push(this);
      // remove repeated tasks
      Tasks.tasks = Tasks.tasks.filter((task, index, self) => index === self.findIndex((t) => (
        t.description === task.description
      )));
      Tasks.setLocal();
      // add Tasks to dom
      Tasks.showTasks();
    }
}